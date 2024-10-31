import InputButton from '@shared/ui/input-button/InputButton';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const hours = [
  'За 1 час',
  'За 2 часа',
  'За 3 часа',
  'За 4 часа',
  'За 5 часов',
  'За 6 часов',
  'За 7 часов',
  'За 8 часов',
  'За 9 часов',
  'За 10 часов',
  'За 11 часов',
  'За 12 часов',
];
interface Props {
    onChange: (value: number) => void;
    value: number | null
}
function SelectedRemind({onChange, value}: Props) {
  const [selectedHour, setSelectedHour] = useState<number | null>(null); // Состояние для хранения выбранного часа
  const [isHoursVisible, setIsHoursVisible] = useState(false);

  const handleHourPress = (index: number) => {
    onChange(index + 1); // Передаем числовое значение (1-12)
    setIsHoursVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <InputButton
        description={value !== null ? hours[value - 1] : ''} // Отображаем текстовые строки
        title="Напомнить"
        onPress={() => setIsHoursVisible((prev) => !prev)}
      />
      {isHoursVisible && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hours.map((hour, index) => (
            <TouchableOpacity
              key={hour}
              onPress={() => handleHourPress(index)} // Передаем индекс
              style={[
                styles.hourButton,
                value === index + 1 && styles.selectedhourButton, // Сравниваем с числовым значением
              ]}
            >
              <Text
                style={[
                  styles.hourButtonText,
                  value === index + 1 && styles.selectedhourButtonText,
                ]}
              >
                {hour}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SelectedRemind;