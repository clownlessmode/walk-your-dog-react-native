import globalStyles from '@shared/constants/globalStyles';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styles from './styles';
interface Props extends TouchableOpacityProps {
    title: string;
    description: string
}
function InputButton({title, description, ...props}: Props) {
  return (
    <TouchableOpacity style={styles.wrapper} {...props}>
      <Text style={[globalStyles.text400, styles.titleText]}>{title}</Text>
      <Text style={[globalStyles.text500, styles.descriptionText]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

export default InputButton;
