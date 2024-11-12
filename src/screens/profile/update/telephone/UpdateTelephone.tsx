import { AntDesign } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Description from '@shared/ui/description/Description';
import Header from '@shared/ui/header/Header';
import Input from '@shared/ui/input/Input';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useUpdateTelephoneStore from './update-telephone.store';
import { useUpdateController } from '@entity/update-telephone/update-telephone.controller';
import Error from '@shared/ui/error/Error';
import Toast from 'react-native-toast-message';
interface FormData {
  updateTelephone: any;
}
function UpdateTelephone() {
  const navigation = useAppNavigation();
  const { setUpdateTelephone } = useUpdateTelephoneStore();
  const { verifyCode, isAuthLoading, error } = useUpdateController();
  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      updateTelephone: '+7',
    },
  });

  const onSubmit = async (data: FormData) => {
    setUpdateTelephone(data.updateTelephone);
    const response = await verifyCode({ telephone: data.updateTelephone });
    if (response.DEVCODE) {
      setTimeout(() => {
        Toast.show({
          type: 'info',
          text1: 'Код подтверждения',
          text2: `${response.DEVCODE}`,
          autoHide: false
        });
      }, 3000)}
    console.info(response);
    navigation.navigate('verifySmsTelephone');
  };
  return (
    <ScreenContainer style={{ gap: 14 }}>
      <Header
        after={
          <AntDesign
            name="close"
            size={20}
            color="black"
            onPress={() => navigation.goBack()}
          />
        }
      >
        Главное - безопасность
      </Header>
      <Description>
        Введите новый номер, мы отправим на него код подтверждения
      </Description>
       <Controller
        control={control}
        name="updateTelephone"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Номер телефона"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            editable={!isAuthLoading}
          />
        )}
      />
      {error && <Error title='Некорректно набран номер телефона'/>}
      <Button isLoading={isAuthLoading} onPress={handleSubmit(onSubmit)}>Получить код</Button>
    </ScreenContainer>
  );
}

export default UpdateTelephone;
