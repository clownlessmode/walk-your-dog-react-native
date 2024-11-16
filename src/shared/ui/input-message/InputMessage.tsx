import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

interface MessageInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onSend?: () => void;
  error?: boolean
}

function InputMessage({
  value,
  onChangeText,
  placeholder,
  onSend,
  error
}: MessageInputProps) {
  const handleKeyPress = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.key === 'Enter') {
      onSend && onSend();
    }
  };

  const inputStyle = error ? styles.inputError : styles.input;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { flex: 1 }, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Сообщение'}
        placeholderTextColor="#A7A7A7"
        onKeyPress={handleKeyPress}
        textAlignVertical="center"
        onSubmitEditing={onSend}
        blurOnSubmit={false} // Keeps the TextInput focused after submitting
      />
      <TouchableOpacity onPress={onSend} disabled={!value?.trim()}>
        <Feather
          name="send"
          size={24}
          color={value?.trim() ? '#51582F' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
}

export default InputMessage;
