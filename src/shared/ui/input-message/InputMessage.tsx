import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import styles from './styles';
interface MessageInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}
function InputMessage({ value, onChangeText, placeholder }: MessageInputProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || 'Сообщение'}
      placeholderTextColor="#A7A7A7"
      multiline
      textAlignVertical="center"
    />
  );
}

export default InputMessage;
