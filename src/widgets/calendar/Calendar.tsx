import React from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
interface Props {
    markedDates?: { [key: string]: any };
    onDayPress?: (day: { dateString: string }) => void;
  }
  
  LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв.', 'Февр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
  };
  LocaleConfig.defaultLocale = 'ru';
function CalendarWidgets({ markedDates, onDayPress }: Props) {
    
  return (
    <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={'custom'}
        theme={{
        dayTextColor: 'black',
        textDisabledColor: 'gray',
        arrowColor: 'black',
        monthTextColor: 'black',
        selectedDayBackgroundColor: '#51582F',
        selectedDayTextColor: 'white',
        todayTextColor: '#51582F',
        dotColor: 'red',
        }}
  />
  )
}

export default CalendarWidgets