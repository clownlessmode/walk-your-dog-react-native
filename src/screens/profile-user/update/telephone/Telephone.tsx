import useUserStore from '@entity/users/user.store';
import { AntDesign } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';
import Input from '@shared/ui/input/Input';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function Telephone() {
    const navigation = useAppNavigation()
  const { user } = useUserStore();
  return (
    <ScreenContainer style={{ gap: 14, alignItems: "center" }}>
      <Header after={<AntDesign name="close" size={20} color="black" />}>
        Главное - безопасность 
      </Header>
      <Description>
        Мы отправим код подтверждения на ваш текущий номер{' '}
        {user?.meta.telephone}
      </Description>
      <Button onPress={() => navigation.navigate("verifySmsTelephone")}>Получить код</Button>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Изменить номер</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

export default Telephone;
