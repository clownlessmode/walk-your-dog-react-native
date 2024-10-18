import { NavigationContainer } from '@react-navigation/native';
import useUserStore from '@entity/users/user.store';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const NavigationProvider = () => {
  const { isRegistered } = useUserStore();
  return (
    <NavigationContainer>
      {isRegistered ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationProvider;
