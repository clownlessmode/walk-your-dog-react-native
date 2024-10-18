import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import globalStyles from '@shared/constants/globalStyles';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
interface Props extends TouchableOpacityProps {
    placeholder: string;
    selectedValue: string | string[],
    isDropdownVisible: boolean;
}
function SelectItem({ placeholder, selectedValue, isDropdownVisible, ...props }: Props) {
    const displayValue = Array.isArray(selectedValue) 
    ? selectedValue.join(', ')
    : selectedValue; 
  return (
    <TouchableOpacity style={styles.wrapper} {...props}>
      <Text style={[globalStyles.text400, styles.text]}>{displayValue || placeholder}</Text>
      <AntDesign name={isDropdownVisible ? 'up' : 'down'} size={20} color="black" />
    </TouchableOpacity>
  );
}

export default SelectItem;
