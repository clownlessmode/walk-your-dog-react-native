import globalStyles from '@shared/constants/globalStyles';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import styles from './styles';
interface Props extends TextInputProps{
  title: string;
  description: string;
}
function InputInfo({ title, description, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={[globalStyles.text400, styles.titleText]}>{title}</Text>
      <TextInput
        style={[globalStyles.text500, styles.descriptionText]}
        placeholder={description}
        placeholderTextColor="#000000"
        {...props}
      />
    </View>
  );
}

export default InputInfo;
