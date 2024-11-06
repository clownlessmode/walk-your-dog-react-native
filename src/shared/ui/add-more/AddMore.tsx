import { AntDesign } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props extends TouchableOpacityProps {
  title: string;
}
function AddMore({ title, ...props }: Props) {
  return (
    <TouchableOpacity style={styles.wrapper} {...props}>
      <Text style={globalStyles.text500}>{title}</Text>
      <AntDesign name="plussquareo" size={18} color="black" />
    </TouchableOpacity>
  );
}

export default AddMore;
