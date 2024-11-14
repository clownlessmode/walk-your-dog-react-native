import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import globalStyles from '@shared/constants/globalStyles';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import SelectBlock from './SelectItem';
import styles from './styles';

interface Options {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Options[]; // Массив строковых опций
  selectedValue: string | string[]; // Выбранное значение: строка или массив
  onSelect: (values: string | string[]) => void; // Возвращаем строку или массив
  placeholder: string;
  multiple: boolean; // Флаг множественного выбора
  isLoading?: boolean;
  emptyLabel?: string;
  error?: boolean;
}

const Dropdown = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  multiple = false,
  isLoading = false,
  emptyLabel,
  error,
}: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = (option: Options) => {
    const newValue = option.value;

    if (multiple) {
      // Логика для множественного выбора
      let newSelectedValues: string[];
      if (Array.isArray(selectedValue)) {
        newSelectedValues = selectedValue.includes(newValue)
          ? selectedValue.filter((item) => item !== newValue) // Убираем выбранный элемент
          : [...selectedValue, newValue]; // Добавляем новый элемент
      } else {
        newSelectedValues = [newValue]; // Если не массив, превращаем в массив
      }
      onSelect(newSelectedValues); // Отдаем массив
    } else {
      // Логика для одиночного выбора
      onSelect(newValue); // Отдаем строку
      toggleDropdown();
    }
  };

  // Обработка "Выбрать все" для множественного выбора
  const handleSelectAll = () => {
    if (Array.isArray(selectedValue)) {
      const selectedSet = new Set(selectedValue);
      if (selectedSet.size === options.length) {
        // Если уже все выбрано, снимаем все выборы
        onSelect([]);
      } else {
        // Добавляем только те, которых еще нет
        const remainingOptions = options
          .map((option) => option.value)
          .filter((value) => !selectedSet.has(value));

        onSelect([...selectedValue, ...remainingOptions]); // Добавляем оставшиеся опции
        toggleDropdown();
      }
    } else {
      // Если ничего не выбрано, выбираем все
      onSelect(options.map((option) => option.value));
      toggleDropdown();
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <SelectBlock
        error={error}
        placeholder={placeholder}
        selectedValue={
          multiple
            ? Array.isArray(selectedValue)
              ? selectedValue
                  .map((value) => {
                    const option = options.find(
                      (option) => option.value === value
                    );
                    return option ? option.label : '';
                  })
                  .join(', ')
              : selectedValue
            : options.find((option) => option.value === selectedValue)?.label ||
              ''
        }
        onPress={toggleDropdown}
        onLayout={(event) => setDropdownHeight(event.nativeEvent.layout.height)}
        isDropdownVisible={isVisible}
      />
      {isVisible && (
        <View style={[styles.dropdownContainer, { top: dropdownHeight }]}>
          <FlatList
            data={
              multiple
                ? [...options, { value: 'select_all', label: 'Выбрать все' }]
                : options
            }
            keyExtractor={(item) => item.value}
            renderItem={({ item }) =>
              !isLoading ? (
                item.value === 'null' ? (
                  <Text
                    style={[
                      globalStyles.text500,
                      styles.optionText,
                      { padding: 30, textAlign: 'center' },
                    ]}
                  >
                    {emptyLabel}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      item.value === 'select_all'
                        ? handleSelectAll()
                        : handleSelect(item)
                    }
                    style={styles.option}
                  >
                    <Text style={[globalStyles.text500, styles.optionText]}>
                      {item.label}
                    </Text>
                    {item.value === 'select_all' ? (
                      // Логика для "Выбрать все"
                      Array.isArray(selectedValue) &&
                      selectedValue.length === options.length ? (
                        <AntDesign name="checkcircle" size={18} color="black" />
                      ) : (
                        <FontAwesome5 name="circle" size={18} color="black" />
                      )
                    ) : multiple ? (
                      Array.isArray(selectedValue) &&
                      selectedValue.includes(item.value) ? (
                        <AntDesign name="checkcircle" size={18} color="black" />
                      ) : (
                        <FontAwesome5 name="circle" size={18} color="black" />
                      )
                    ) : selectedValue === item.value ? (
                      <AntDesign name="checkcircle" size={18} color="black" />
                    ) : (
                      <FontAwesome5 name="circle" size={18} color="black" />
                    )}
                  </TouchableOpacity>
                )
              ) : (
                <ActivityIndicator
                  style={{ padding: 30 }}
                  size="small"
                  color="#9D9D9D"
                />
              )
            }
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;
