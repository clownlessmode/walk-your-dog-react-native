import InputButton from '@shared/ui/input-button/InputButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
interface TimeValue {
    start?: string;
    end?: string;
  }
  
  interface SelectTimeProps {
    onChange?: (start: string, end: string) => void;
    value?: TimeValue;
  }
function SelectTime({ onChange, value }: SelectTimeProps) {
  const [startTime, setStartTime] = useState(new Date()); // Время начала работы
  const [endTime, setEndTime] = useState(new Date()); // Время конца работы
  const [showStartTimePicker, setShowStartTimePicker] = useState(false); // Показать выбор времени начала
  const [showEndTimePicker, setShowEndTimePicker] = useState(false); // Показать выбор времени конца
  useEffect(() => {
    // Устанавливаем время начала и конца из value или используем текущее время
    setStartTime(new Date(value?.start || Date.now()));
    setEndTime(new Date(value?.end || Date.now()));
  }, [value]);

  const onStartTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentTime);
    if (onChange) {
      onChange(currentTime.toISOString(), endTime.toISOString());
    }
  };

  const onEndTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentTime);
    if (onChange) {
      onChange(startTime.toISOString(), currentTime.toISOString());
    }
  };

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
        onPress={() => setShowStartTimePicker(true)} // Открываем выбор времени начала
        title="Время начала работы"
        description={formatTime(startTime)}
      />

      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onStartTimeChange}
        />
      )}

      <InputButton
        onPress={() => setShowEndTimePicker(true)} // Открываем выбор времени конца
        title="Время конца работы"
        description={formatTime(endTime)}
      />

      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onEndTimeChange}
        />
      )}
    </View>
  );
}

export default SelectTime;
