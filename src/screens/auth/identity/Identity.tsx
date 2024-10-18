import ContactSupport from '@features/contact-support/ContactSupport';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Logotype from '@shared/ui/logotype/Logotype';
import { View } from 'react-native';
import styles from './styles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import useRoleStore from '../role.store';
import { useState } from 'react';
import CustomDropdown from '@shared/ui/dropdown/Dropdown';
import Input from '@shared/ui/input/Input';

const Identity = () => {
  const navigation = useAppNavigation()
  const {setRole} = useRoleStore()
  const handleRole = (role: string) => {
    setRole(role)
    navigation.navigate("authorization")
  }
  return (
    <ScreenContainer style={{justifyContent: "space-around"}}>
      <Logotype />
      <View style={styles.buttonContainer}>
        <Button onPress={() => handleRole('CLIENT')}>Клиент</Button>
        <Button variant="light" onPress={() => handleRole('SITTER')}>Сотрудник</Button>
      </View>
      <ContactSupport />
    </ScreenContainer>
  );
};

export default Identity;
