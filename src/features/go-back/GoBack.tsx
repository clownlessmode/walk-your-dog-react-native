import { MaterialIcons } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

const GoBack = () => {
  const navigation = useAppNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
      <MaterialIcons name="keyboard-backspace" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default GoBack;
