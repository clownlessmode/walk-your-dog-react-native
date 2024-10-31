import DateTimePicker from '@react-native-community/datetimepicker';
import InputButton from '@shared/ui/input-button/InputButton';
import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
interface Props {
  onChange: (value: string) => void;
  value: string
}
function SelectedTime({ onChange, value }: Props) {
  const [date, setDate] = useState(new Date()); // Состояние для даты
  const [time, setTime] = useState(new Date()); // Состояние для времени
  const [showDatePicker, setShowDatePicker] = useState(false); // Видимость DateTimePicker для даты
  const [showTimePicker, setShowTimePicker] = useState(false); // Видимость DateTimePicker для времени

  // Устанавливаем начальные значения из value, если они передаются
  useEffect(() => {
    if (value) {
      const dateValue = new Date(value);
      setDate(dateValue);
      setTime(dateValue);
    }
  }, [value]);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Закрываем выбор даты
    setDate(currentDate); // Устанавливаем выбранную дату
    console.log('Выбранная дата:', currentDate.toLocaleDateString());

    // Сразу открываем выбор времени после выбора даты
    setShowTimePicker(true);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false); // Закрываем выбор времени
    setTime(currentTime); // Устанавливаем выбранное время
    console.log('Выбранное время:', currentTime.toLocaleTimeString());

    // Обновляем значение в react-hook-form
    const combinedDateTime = new Date(currentTime);
    combinedDateTime.setFullYear(date.getFullYear());
    combinedDateTime.setMonth(date.getMonth());
    combinedDateTime.setDate(date.getDate());
    onChange(combinedDateTime.toISOString()); // Устанавливаем значение в формате ISO
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });
  };

  // Форматируем время
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-часовой формат
    });
  };

  return (
    <View>
      <InputButton
        onPress={() => setShowDatePicker(true)}
        title='Время'
        description={`${formatDate(date)}, ${formatTime(time)}`}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

export default SelectedTime;