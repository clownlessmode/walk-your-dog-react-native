import DateTimePicker from '@react-native-community/datetimepicker';
import InputButton from '@shared/ui/input-button/InputButton';
import React, { useState, useEffect } from 'react';
import { Platform, View } from 'react-native';
interface Props {
  onChange?: (value: string) => void;
  value?: string;
}
function SelectedTime({ onChange, value }: Props) {
  const [date, setDate] = useState(new Date()); 
  const [time, setTime] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [showTimePicker, setShowTimePicker] = useState(false); 

  useEffect(() => {
    if (value) {
      const dateValue = new Date(value);
      setDate(dateValue);
      setTime(dateValue);
    }
  }, [value]);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); 
    setDate(currentDate); 
    console.log('Выбранная дата:', currentDate.toLocaleDateString());

    setShowTimePicker(true);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime); 

    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(currentTime.getHours());
    combinedDateTime.setMinutes(currentTime.getMinutes());
  
    console.log('Выбранная дата и время:', combinedDateTime.toISOString());
    if (onChange) {
      onChange(combinedDateTime.toISOString());
    }
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
      hour12: false,
    });
  };

  return (
    <View>
      <InputButton
        onPress={() => setShowDatePicker(true)}
        title="Время"
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
