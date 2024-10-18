import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, TouchableOpacityProps } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Option {
  label: string;
  value: any;
}
interface Props extends TouchableOpacityProps {
  error?: boolean
  title: string;
  options: Option[]
  value: any,
  onChange: (value: any) => void
}
const Switch = ({ error, title, options, value, onChange, ...props}: Props) => {

  const [position] = useState(
    new Animated.Value(options.findIndex(option => option.value === value) === 0 ? 0 : 1)
  );

  useEffect(() => {
    if (value === undefined || value === null) {
      onChange(options[0].value);
    }
  }, [value, onChange, options]);

  const handleOptionSelect = (selectedValue: string) => {
    onChange(selectedValue);

    const index = options.findIndex(option => option.value === selectedValue);
    Animated.timing(position, {
      toValue: index === 0 ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ gap: 10, alignItems: 'center', width: '99%' }}>
      <Text style={[globalStyles.text500, styles.titleText]}>{title}</Text>
      <View style={styles.optionContainer}>
      {options.map(option => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleOptionSelect(option.value)}
            style={[
              styles.optionButton,
              {
                backgroundColor: value === option.value ? 'white' : '#ccc',
              },
            ]}
          >
            <Text style={[globalStyles.text500, styles.optionText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Switch;
