import Dropdown from '@shared/ui/dropdown/Dropdown';
import InputButton from '@shared/ui/input-button/InputButton';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
interface Props {
  onChange: (value: number[]) => void;
  value: number[]
}
function SelecteadRepeat({onChange, value = []}: Props) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [isDaysVisible, setIsDaysVisible] = useState(false);

  const handleDayPress = (dayIndex: number) => {
    // Проверяем, выбран ли день, и обновляем состояние
    const newSelectedDays = value.includes(dayIndex + 1)
      ? value.filter((d) => d !== dayIndex + 1) // Убираем день, если он уже выбран
      : [...value, dayIndex + 1]; // Добавляем день, если он не выбран

    onChange(newSelectedDays); // Обновляем значение в форме
  };

  return (
    <View style={styles.wrapper}>
      <InputButton
        title="Повторение"
        description={
          value.length !== 0 ? value.map((day) => daysOfWeek[day - 1]).join(', ') : 'Никогда'
        }
        onPress={() => setIsDaysVisible((prev) => !prev)}
      />

      {isDaysVisible && (
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity
              key={day}
              onPress={() => handleDayPress(index)} // Передаем индекс дня
              style={[
                styles.dayButton,
                value.includes(index + 1) && styles.selectedDayButton, // Проверяем, выбран ли день
              ]}
            >
              <Text
                style={[
                  styles.dayButtonText,
                  value.includes(index + 1) && styles.selectedDayButtonText,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SelecteadRepeat;
