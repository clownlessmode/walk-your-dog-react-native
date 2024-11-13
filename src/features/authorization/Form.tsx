import { useAuthController } from '@entity/auth/auth.controller';
import usePromocodeStore from '@screens/auth/promocode.store';
import useRoleStore from '@screens/auth/role.store';
import useTelephoneStore from '@screens/auth/telephone.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import Error from '@shared/ui/error/Error';
import Input from '@shared/ui/input/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
export interface FormData {
  telephone: string;
  promocode: string;
  worker: boolean;
}
const Form = () => {
  const navigation = useAppNavigation();
  const { preAuth, isAuthLoading, error } = useAuthController();
  const { role, setRole } = useRoleStore();
  const { setTelephone } = useTelephoneStore();
  const { setPromocode } = usePromocodeStore();
  let sitter;
  const isWorker = role === 'SITTER';
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      telephone: '+7',
      promocode: '',
      worker: isWorker,
    },
  });

  const onSubmit = async (data: FormData) => {
    // const number = normalizeTelephone(data.telephone);
    const response = await preAuth({
      telephone: data.telephone,
      worker: isWorker,
    });
    console.info(response);
    
    if (response.code) {
      setTimeout(() => {
        Toast.show({
          type: 'info',
          text1: 'Код подтверждения',
          text2: `${response.DEVCODE}`,
          autoHide: false,
        });
      }, 3000);
      setTelephone(data.telephone);
      setPromocode(data.promocode);
      if (isWorker) {
        if (response.workerAllowed) {
          navigation.navigate('verifySms');
        } else {
          navigation.navigate('identity');
          Toast.show({
            type: 'error',
            text1: 'Ошибка',
            text2: 'Вы не являетесь сотрудником',
          });
        }
      }
      else {
        navigation.navigate('verifySms')
      }
    }
  };

  return (
    <>
      <Controller
        control={control}
        name="telephone"
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
      {error && <Error title="Некорректно набран номер телефона" />}
      <Controller
        control={control}
        name="promocode"
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Промокод при его наличии"
            value={value}
            onChangeText={onChange}
            editable={!isAuthLoading}
          />
        )}
      />

      <Button
        children={'Войти'}
        onPress={handleSubmit(onSubmit)}
        isLoading={isAuthLoading}
      />
    </>
  );
};

export default Form;
