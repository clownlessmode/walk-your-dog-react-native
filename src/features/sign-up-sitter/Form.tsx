import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import useTelephoneStore from '@screens/auth/telephone.store';
import useRoleStore from '@screens/auth/role.store';
import usePromocodeStore from '@screens/auth/promocode.store';
import { Role } from '@entity/users/model/role.enum';
import ImagePicker from '@shared/ui/image-picker/ImagePicker';
import Input from '@shared/ui/input/Input';
import Error from '@shared/ui/error/Error';
import Dropdown from '@shared/ui/dropdown/Dropdown';
import option from '@features/sign-up-user/option';
import Drawer from '@shared/ui/drawer/Drawer';
import SelectInterval from './select-interval/SelectInterval';
import SelecteadRepeat from '@features/selected-repeat/SelectedRepeat';
import Button from '@shared/ui/button/Button';
interface FormData {
  image: any;
  name: any;
  telephone: any;
  email: any;
  city: any;
  interval: any;
  services: any;
  pets: any;
  role: any;
  promocode: any;
}
function Form() {
  const { telephone } = useTelephoneStore();
  const { role } = useRoleStore();
  const { promocode } = usePromocodeStore();
  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      image: null,
      name: '',
      telephone: telephone as string,
      email: '',
      city: '',
      interval: '',
      services: '',
      pets: '',
      role: role as Role,
      promocode: promocode as string,
    },
  });
  const onSubmit = (data: FormData) => {
    console.log('Данные формы:', data); // Выводим данные в консоль
    // Здесь можно добавить логику для отправки данных на сервер
  };
  return (
    <View style={styles.form}>
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImagePicker onChange={onChange} image={value} />
        )}
      />
      <Controller
        name="city"
        control={control}
        rules={{ required: 'Выбор города обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 9999 }}>
            <Dropdown
              placeholder="Выберите свой город"
              multiple={false}
              options={option}
              selectedValue={value}
              onSelect={onChange}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Имя и фамилия обязательны',
          pattern: {
            value: /^[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+$/,
            message: 'Имя и фамилия обязательны',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Имя фамилия"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="telephone"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Номер телефона"
            editable={false}
          />
        )}
      />
      <Controller
        name="services"
        control={control}
        rules={{ required: 'Выбор услуги обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 9999 }}>
            <Dropdown
              placeholder="Услуги"
              multiple={false}
              options={option}
              selectedValue={value}
              onSelect={onChange}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Введите корректный адрес электронной почты',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Введите корректный адрес электронной почты',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Электронная почта"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />

      <Controller
        name="interval"
        control={control}
        rules={{ required: 'Выбор интервала обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 9999 }}>
            <Drawer
              hasBackdrop={true}
              trigger={
                <Input
                  value={value}
                  onChange={onChange}
                  editable={false}
                  placeholder="Выберите интервал для работы"
                />
              }
            >
              <SelectInterval onChange={onChange} value={value} />
            </Drawer>
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />

      <Controller
        name="pets"
        control={control}
        rules={{ required: 'Выбор питомца обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 9999 }}>
            <Dropdown
              placeholder="Животные"
              multiple={false}
              options={option}
              selectedValue={value}
              onSelect={onChange}
            />
            {fieldState.error && (
              <Error
                style={{ justifyContent: 'flex-start' }}
                title={fieldState.error.message}
              />
            )}
          </View>
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Сохранить</Button>
    </View>
  );
}

export default Form;
