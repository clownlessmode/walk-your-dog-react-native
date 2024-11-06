import React from 'react';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import Form from '@features/service/Form';

function Service() {
 
  return (
    <ScreenContainer style={{ paddingHorizontal: 0 }}>
      <Header style={{ paddingHorizontal: 15 }} before={<GoBack />}>
        Выберите питомца и услугу
      </Header>
      <Form />
    </ScreenContainer>
  );
}

export default Service;
