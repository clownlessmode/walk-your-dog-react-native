import ContactSupport from '@features/contact-support/ContactSupport';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Logotype from '@shared/ui/logotype/Logotype';
import { View } from 'react-native';
import styles from './styles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import useRoleStore from '../role.store';
import useUserStore from '@entity/users/user.store';
import Form from '@features/sign-up-pet/Form';
import FinishedEvent from '@screens/finished-event/FinishedEvent';


const Identity = () => {
  const navigation = useAppNavigation();
  const { setRole } = useRoleStore();
  const handleRole = (role: string) => {
    setRole(role);
    navigation.navigate('authorization');
  };  

  return (
    <ScreenContainer style={{justifyContent: 'space-between'}}>
      <Logotype />
      <View style={styles.buttonContainer}>
        <Button onPress={() => handleRole('CLIENT')}>Клиент</Button>
        <Button variant="light" onPress={() => handleRole('SITTER')}>
          Сотрудник
        </Button>
      </View>
      <ContactSupport />
    </ScreenContainer>
  );
};

export default Identity;
