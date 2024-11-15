import { MaterialIcons } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { TouchableOpacity } from 'react-native';
import styles from './styles';

const FinishedGoBack = () => {
  const navigation = useAppNavigation();
  const navAppStack = () =>{
    navigation.navigate('appStack')
}
  return (
    <TouchableOpacity style={styles.backButton} onPress={navAppStack}>
      <MaterialIcons name="keyboard-backspace" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default FinishedGoBack;
