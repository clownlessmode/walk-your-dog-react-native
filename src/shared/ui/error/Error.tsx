import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props {
  title: string | undefined;
  style?: StyleProp<ViewStyle>;
}
const Error = ({ title, style }: Props) => {
  return (
    <View style={[styles.errorWrapper, style]}>
      <MaterialIcons name="error-outline" size={14} color="red" />
      <Text style={[globalStyles.text400, { color: 'red' }]}>{title}</Text>
    </View>
  );
};

export default Error;
