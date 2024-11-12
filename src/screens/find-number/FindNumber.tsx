import ContactSupport from '@features/contact-support/ContactSupport';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

function FindNumber() {
  const navigation = useAppNavigation();
  return (
    <ScreenContainer style={{ justifyContent: 'space-between' }}>
      <Header>Давайте знакомиться!</Header>
      <View style={{ gap: 30 }}>
        <Text style={[globalStyles.text400, styles.allText]}>
          Мы не нашли вашего номера в базе, пожалуйста,{' '}
          <Text style={[globalStyles.text600, styles.text]}>
            Заполните анкету
          </Text>{' '}
          для дальнейшей работы
        </Text>
        <Button onPress={() => navigation.navigate('signUpSitter')}>
          Заполнить
        </Button>
      </View>
      <ContactSupport />
    </ScreenContainer>
  );
}

export default FindNumber;
