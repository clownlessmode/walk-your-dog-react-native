import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';
import MaskInput, { Masks } from 'react-native-mask-input';
import globalStyles from '@shared/constants/globalStyles';
interface Props extends TextInputProps {
  error?: boolean
}
const Input = ({error, ...props }: Props) => {
  const inputStyle = error ? styles.inputError : styles.input;
    if (props.keyboardType === 'phone-pad') {
        // Если тип клавиатуры phone-pad, используем MaskInput для маски
        return (
            <MaskInput
            style={[globalStyles.text400, styles.input, props.style]}
            {...props}
            mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, '-', /\d/, /\d/]}
          />
          
        );
      }
  return <TextInput style={[globalStyles.text400, inputStyle, props.style]} placeholderTextColor="#2A2A2A" {...props}/>;
};
export default Input;

