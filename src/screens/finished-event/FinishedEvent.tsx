import Form from '@features/finished-event/Form';
import FinishedGoBack from '@features/finished-go-back/FinishedGoBack';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import { Text, View } from 'react-native';

function FinishedEvent() {
  const navigation = useAppNavigation();

  return (
    <ScreenContainer>
      <Header before={<FinishedGoBack />}>Заказ окончен</Header>
      <Text
        style={[globalStyles.text500, { textAlign: 'center', fontSize: 20 }]}
      >
        Опишите как все прошло
      </Text>
      <Form />
    </ScreenContainer>
  );
}

export default FinishedEvent;
