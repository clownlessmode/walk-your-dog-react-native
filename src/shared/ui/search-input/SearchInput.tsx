import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChangeText, placeholder }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Введите текст'}
        placeholderTextColor="#A7A7A7"
      />
      <MaterialIcons name="search" size={20} color="#33363F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 18,
    paddingHorizontal: 10,
    height: 36,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
   
    color: 'black',
  },
});

export default SearchInput;
