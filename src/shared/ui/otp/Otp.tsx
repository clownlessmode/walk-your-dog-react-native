import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';
import Input from '../input/Input';
import globalStyles from '@shared/constants/globalStyles';
import { useAuthController } from '@entity/auth/auth.controller';
interface OTPInputProps {
  value: string;
  length?: number;
  onChange: (value: string) => void;
  onComplete?: (code: string) => void;
}
function Otp({ length = 4, value, onChange, onComplete }: OTPInputProps) {
  const inputsRef = useRef<(TextInput | null)[]>([]); // Массив для хранения рефов всех инпутов

  const handleChangeText = (text: string, index: number) => {
    let newOtp = value.split('');
    newOtp[index] = text;
  
    // Если введен один символ, перейти на следующий инпут
    if (text.length === 1 && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  
    // Обновляем общее значение OTP
    onChange(newOtp.join(''));
    
    // Если все символы введены, вызываем onComplete
    if (newOtp.join('').length === length) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => (inputsRef.current[index] = ref)}
            value={value[index] || ''}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
          />
        ))}
    </View>
  );
}

export default Otp;
