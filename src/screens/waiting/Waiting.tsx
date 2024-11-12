import { ServiceCreateRo } from '@entity/service/model/service.interface';
import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ServiceInfo from '@shared/ui/service-info/ServiceInfo';
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Waiting() {
  LocaleConfig.locales['ru'] = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: [
      'Янв.',
      'Февр.',
      'Март',
      'Апр.',
      'Май',
      'Июнь',
      'Июль',
      'Авг.',
      'Сент.',
      'Окт.',
      'Нояб.',
      'Дек.',
    ],
    dayNames: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
  };
  LocaleConfig.defaultLocale = 'ru';
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

        // Добавляем точки для событий и стили для текущей даты
        getMyServices.forEach((event) => {
          const date = event.datetime.split('T')[0];
          dates[date] = {
            customStyles: {
              container: {},
              text: {
                color: '#FF8B20',
              },
            },
          };
        });

        // Добавляем кастомный стиль для текущей даты
        dates[today] = {
          ...dates[today],
          customStyles: {
            container: {
              borderColor: '#51582F', // Цвет бордера для текущей даты
              borderWidth: 1,
            },
            text: {
              color: 'black', // Цвет текста для текущей даты
            },
          },
        };

        setMarkedDates(dates);
      };
      generateMarkedDates();
    }
  }, [getMyServices]);

  const handleDayPress = (day: { dateString: string }) => {
    const newSelectedDate = day.dateString;

    // Обновляем метки для дат, чтобы выделить только одну выбранную дату, не трогая текущую дату
    setMarkedDates((prevMarkedDates) => {
      const updatedDates = { ...prevMarkedDates };

      // Убираем выделение с предыдущей выбранной даты, если она не является текущей
      if (
        selectedDate &&
        selectedDate !== today &&
        updatedDates[selectedDate]
      ) {
        delete updatedDates[selectedDate].customStyles;
      }

      // Устанавливаем кастомное выделение для новой выбранной даты
      if (newSelectedDate !== today) {
        updatedDates[newSelectedDate] = {
          ...updatedDates[newSelectedDate],
          customStyles: {
            container: {
              backgroundColor: '#51582F', // Цвет фона для выбранной даты
            },
            text: {
              color: 'white',
            },
          },
        };
      }

      return updatedDates;
    });

    const eventsOnSelectedDate =
      getMyServices?.filter((ev) => ev.datetime.startsWith(newSelectedDate)) ||
      [];
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
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType={'custom'}
        theme={{
          dayTextColor: 'black', // Основной цвет текста для дней
          textDisabledColor: 'gray', // Цвет для неактивных дат
          arrowColor: 'black', // Цвет стрелок переключения месяцев
          monthTextColor: 'black', // Цвет текста месяца
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
        <Text style={[globalStyles.text500]}>Событий на выбранную дату нет.</Text>
        </View>
      )}
    </View>
  );
}

export default Waiting;
