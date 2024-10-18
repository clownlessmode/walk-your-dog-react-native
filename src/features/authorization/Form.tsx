import { useAuthController } from '@entity/auth/auth.controller';
import usePromocodeStore from '@screens/auth/promocode.store';
import useTelephoneStore from '@screens/auth/telephone.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import Error from '@shared/ui/error/Error';
import Input from '@shared/ui/input/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
export interface FormData {
  telephone: string;
  promocode: string;
}
const Form = () => {
  const navigation = useAppNavigation();
  const { preAuth, isAuthLoading, error } = useAuthController();
  const { setTelephone } = useTelephoneStore();
  const { setPromocode } = usePromocodeStore()
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      telephone: '+7',
      promocode: '',
    },
  });

    const onSubmit = async (data: FormData) => {
    // const number = normalizeTelephone(data.telephone);
    const response = await preAuth({ telephone: data.telephone });
    console.log(response);
    if (response.code) {
      setTelephone(data.telephone);
      setPromocode(data.promocode);
      navigation.navigate('verifySms');
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
      {error && <Error title='Некорректно набран номер телефона'/>}
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
