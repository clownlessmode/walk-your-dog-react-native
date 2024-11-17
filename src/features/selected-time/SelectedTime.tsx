import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@shared/ui/button/Button';
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

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
    setShowTimePicker(false);
  };

  const toggleTimePicker = () => {
    setShowTimePicker((prev) => !prev);
    setShowDatePicker(false);
  };

  const handleDateConfirm = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    updateCombinedDateTime(currentDate, time);
    setShowDatePicker(false);
  };

  const handleTimeConfirm = (selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    updateCombinedDateTime(date, currentTime);
    setShowTimePicker(false);
  };

  const updateCombinedDateTime = (date: Date, time: Date) => {
    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(time.getHours());
    combinedDateTime.setMinutes(time.getMinutes());
    if (onChange) {
      onChange(combinedDateTime.toISOString());
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      handleDateConfirm(selectedDate);
    } else {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (Platform.OS === 'android') {
      handleTimeConfirm(selectedTime);
    } else {
      const currentTime = selectedTime || time;
      setTime(currentTime);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <View style={{ paddingBottom: 30, gap: 20 }}>
      <InputButton
        onPress={toggleDatePicker}
        title="Дата"
        description={formatDate(date)}
      />

      {showDatePicker && (
        <View>
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
          {Platform.OS === 'ios' && (
            <Button onPress={() => handleDateConfirm(date)}>Подтвердить</Button>
          )}
        </View>
      )}

      <InputButton
        onPress={toggleTimePicker}
        title="Время"
        description={formatTime(time)}
      />
      {showTimePicker && (
        <View>
          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
          {Platform.OS === 'ios' && (
            <Button onPress={() => handleTimeConfirm(time)}>Подтвердить</Button>
          )}
        </View>
      )}
    </View>
  );
}

export default SelectedTime;