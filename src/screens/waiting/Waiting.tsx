import { ServiceCreateRo } from '@entity/service/model/service.interface';
import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ServiceInfo from '@shared/ui/service-info/ServiceInfo';
import CalendarWidgets from '@widgets/calendar/Calendar';
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Waiting() {
  const navigation = useAppNavigation()
  const { user } = useUserStore();
  const { getMyServices, loadingMyServices } = useServiceController(user?.id);
  const insets = useSafeAreaInsets();
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedEvents, setSelectedEvents] = useState<ServiceCreateRo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Получаем текущую дату в формате YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (getMyServices) {
      const generateMarkedDates = () => {
        const dates: { [key: string]: any } = {};
        getMyServices.forEach((event) => {
          const date = event.datetime.split('T')[0];
          dates[date] = {
            customStyles: {
              text: {
                color: '#FF8B20',
              },
            },
          };
        });
        dates[today] = {
          ...dates[today],
          customStyles: {
            container: { borderColor: '#51582F', borderWidth: 1 },
            text: { color: 'black' },
          },
        };
        setMarkedDates(dates);
      };
      generateMarkedDates();
    }
  }, [getMyServices]);

  const handleDayPress = (day: { dateString: string }) => {
    const newSelectedDate = day.dateString;
    setMarkedDates((prevMarkedDates) => {
      const updatedDates = { ...prevMarkedDates };
      if (selectedDate && selectedDate !== today && updatedDates[selectedDate]) {
        delete updatedDates[selectedDate].customStyles;
      }
      if (newSelectedDate !== today) {
        updatedDates[newSelectedDate] = {
          ...updatedDates[newSelectedDate],
          customStyles: {
            container: { backgroundColor: '#51582F' },
            text: { color: 'white' },
          },
        };
      }
      return updatedDates;
    });
    const eventsOnSelectedDate = getMyServices?.filter((ev) => ev.datetime.startsWith(newSelectedDate)) || [];
    setSelectedEvents(eventsOnSelectedDate);
    setSelectedDate(newSelectedDate);
  };

  if (loadingMyServices) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const handleEventPress = (event: ServiceCreateRo) => {
    navigation.navigate('eventWaiting', { event });
  };
  return (
    <View style={{ paddingTop: insets.top + 20 }}>
      <CalendarWidgets
         onDayPress={handleDayPress}
         markedDates={markedDates}
      />
      {selectedEvents.length > 0 ? (
        selectedEvents.map((event, index) => {
            const date = new Date(event.datetime);
            const time = date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            const formattedDate = date.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: 'long',
            });
            return (
          <TouchableOpacity onPress= {() => handleEventPress(event)} key={index} style={{paddingHorizontal: 15}}>
            <ServiceInfo
            key={index}
              pet={event.pet}
              service={event}
              time={time}
              formattedDate={formattedDate}
            />
          </TouchableOpacity>
            )
})
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
        <Text style={[globalStyles.text500, {fontSize: 18}]}>Событий на выбранную дату нет</Text>
        </View>
      )}
    </View>
  );
}

export default Waiting;
