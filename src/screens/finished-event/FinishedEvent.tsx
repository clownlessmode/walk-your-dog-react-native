import Form from '@features/finished-event/Form';
import FinishedGoBack from '@features/finished-go-back/FinishedGoBack';
import { useRoute } from '@react-navigation/native';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import { Text, View } from 'react-native';

function FinishedEvent() {
  const navigation = useAppNavigation();
  const route = useRoute();
  const { serviceId } = route.params as { serviceId: string };
  return (
    <ScreenContainer>
      <Header before={<FinishedGoBack />}>Заказ окончен</Header>
      <Text
        style={[globalStyles.text500, { textAlign: 'center', fontSize: 20 }]}
      >
        Опишите как все прошло
      </Text>
      <Form serviceId={serviceId}/>
    </ScreenContainer>
  );
}

export default FinishedEvent;
