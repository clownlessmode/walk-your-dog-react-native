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

function AllEvent() {
    const { user } = useUserStore();
    const navigation = useAppNavigation();
    const { getAllWorkerService, isLoadingAllWorkerService } = useServiceController();
    const insets = useSafeAreaInsets();
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { dots?: { color: string }[]; selected?: boolean; selectedColor?: string } }>({});
    const [selectedEvents, setSelectedEvents] = useState<ServiceCreateRo[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    // Получаем текущую дату в формате YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
  
    useEffect(() => {
        if (getAllWorkerService && Array.isArray(getAllWorkerService)) {
          const generateMarkedDates = () => {
            const dates: { [key: string]: { dots?: { color: string }[]; selected?: boolean; selectedColor?: string } } = {};
      
            getAllWorkerService.forEach((event: any) => {
              if (event.datetime) {
                const date = event.datetime.split('T')[0];
                dates[date] = { dots: [{ color: 'red' }] };
              }
            });
      
            dates[today] = { ...dates[today], selected: true, selectedColor: '#FFF3F8' };
            setMarkedDates(dates);
          };
          generateMarkedDates();
        }
      }, [getAllWorkerService]);
  
    const handleDayPress = (day: { dateString: string }) => {
      const newSelectedDate = day.dateString;
  
      // Обновляем метки для дат, чтобы выделить только одну выбранную дату, не трогая текущую дату
      setMarkedDates((prevMarkedDates) => {
        const updatedDates = { ...prevMarkedDates };
  
        // Убираем выделение с предыдущей выбранной даты, если она не является текущей
        if (selectedDate && selectedDate !== today && updatedDates[selectedDate]) {
          delete updatedDates[selectedDate].selected;
          delete updatedDates[selectedDate].selectedColor;
        }
  
        // Устанавливаем выделение для новой выбранной даты
        if (newSelectedDate !== today) {
          updatedDates[newSelectedDate] = {
            ...updatedDates[newSelectedDate],
            selected: true,
            selectedColor: '#51582F', // Цвет для выделенной даты
          };
        }
  
        return updatedDates;
      });
  
      const eventsOnSelectedDate = getAllWorkerService?.filter((ev: any) => ev.datetime.startsWith(newSelectedDate)) || [];
      setSelectedEvents(eventsOnSelectedDate);
      setSelectedDate(newSelectedDate);
    };
  
    if (isLoadingAllWorkerService) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      );
    }
    const handleEventPress = (event: ServiceCreateRo) => {
        navigation.navigate('eventDetails', { event });
      };
  return (
    <View style={{ paddingTop: insets.top + 20 }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'multi-dot'}
        theme={{
          selectedDayBackgroundColor: 'blue', // Цвет фона выбранного дня
          selectedDayTextColor: 'black', // Цвет текста выбранного дня
          todayTextColor: 'black', // Цвет текста для текущей даты
          dayTextColor: 'black', // Основной цвет текста для дней
          textDisabledColor: 'gray', // Цвет для неактивных дат
          arrowColor: 'black', // Цвет стрелок переключения месяцев
          monthTextColor: 'black', // Цвет текста месяца
          todayBackgroundColor: '#FFF3F8', // Фон для текущей даты
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

export default AllEvent;
