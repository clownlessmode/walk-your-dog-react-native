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
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { getMyServices, loadingMyServices } = useServiceController(user?.id);
  const insets = useSafeAreaInsets();
  const [localServices, setLocalServices] = useState<ServiceCreateRo[]>([]);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedEvents, setSelectedEvents] = useState<ServiceCreateRo[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  // Сохранение полученных данных, если они корректные, с защитой от перезаписи пустыми данными
  useEffect(() => {
    if (getMyServices && getMyServices.length > 0) {
      setLocalServices(getMyServices);
      setInitialLoad(false); // Завершаем начальную загрузку, если данные получены
    } else if (getMyServices && getMyServices.length === 0 && initialLoad) {
      // Если это начальная загрузка и данные пустые, сохраняем пустое состояние и завершаем начальную загрузку
      setInitialLoad(false);
    }
  }, [getMyServices]);

  // Установка меток на календаре при изменении `localServices`
  useEffect(() => {
    if (!initialLoad) {
      const generateMarkedDates = () => {
        const dates: { [key: string]: any } = {};

        if (localServices.length > 0) {
          localServices.forEach((event) => {
            const date = event.datetime.split('T')[0];
            dates[date] = { dots: [{ color: 'red' }] };
          });
        }

        dates[today] = {
          ...dates[today],
          selected: true,
          selectedColor: '#FFF3F8',
        };

        setMarkedDates(dates);
      };

      generateMarkedDates();
    }
  }, [localServices, initialLoad]);

  // Обработчик выбора даты
  const handleDayPress = (day: { dateString: string }) => {
    const newSelectedDate = day.dateString;

    // Обновление выделения даты
    setMarkedDates((prevMarkedDates) => {
      const updatedDates = { ...prevMarkedDates };

      // Убираем выделение с предыдущей выбранной даты, если она не является текущей
      if (
        selectedDate &&
        selectedDate !== today &&
        updatedDates[selectedDate]
      ) {
        delete updatedDates[selectedDate].selected;
        delete updatedDates[selectedDate].selectedColor;
      }

      // Устанавливаем выделение для новой выбранной даты
      if (newSelectedDate !== today) {
        updatedDates[newSelectedDate] = {
          ...updatedDates[newSelectedDate],
          selected: true,
          selectedColor: '#51582F',
        };
      }

      return updatedDates;
    });

    const eventsOnSelectedDate = localServices.filter((ev) =>
      ev.datetime.startsWith(newSelectedDate)
    );
    setSelectedEvents(eventsOnSelectedDate);
    setSelectedDate(newSelectedDate);
  };

  // Показ индикатора загрузки при первой загрузке
  if (loadingMyServices && initialLoad) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#9D9D9D" />
      </View>
    );
  }

  const handleEventPress = (event: ServiceCreateRo) => {
    navigation.navigate('eventWaiting', { event });
  };

  return (
    <View style={{ paddingTop: insets.top + 20 }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'multi-dot'}
        theme={{
          selectedDayBackgroundColor: 'blue',
          selectedDayTextColor: 'black',
          todayTextColor: 'black',
          dayTextColor: 'black',
          textDisabledColor: 'gray',
          arrowColor: 'black',
          monthTextColor: 'black',
          todayBackgroundColor: '#FFF3F8',
        }}
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
            <TouchableOpacity
              onPress={() => handleEventPress(event)}
              key={index}
              style={{ paddingHorizontal: 15 }}
            >
              <ServiceInfo
                key={index}
                pet={event.pet}
                service={event}
                time={time}
                formattedDate={formattedDate}
              />
            </TouchableOpacity>
          );
        })
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}
        >
          <Text style={[globalStyles.text500, { fontSize: 18 }]}>
            Событий на выбранную дату нет
          </Text>
        </View>
      )}
    </View>
  );
}

export default Waiting;
