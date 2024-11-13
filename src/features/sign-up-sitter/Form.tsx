import React, { useState } from 'react';
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
import useUserStore from '@entity/users/user.store';
import { useAuthController } from '@entity/auth/auth.controller';
import { SignUpDto } from '@entity/auth/model/auth.interface';
import { useServiceController } from '@entity/service/service.controller';
import { usePetTypesController } from '@entity/pet-types/pet-types.controller';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
interface FormData {
  image: any;
  name: any;
  telephone: any;
  email: any;
  city: any;
  start: any;
  end: any;
  days: any;
  petTypes: any;
  services: any;
  role: any;
  promocode: any;
  interval: any;
}
function Form() {
  const navigation = useAppNavigation();
  const [intervalError, setIntervalError] = useState('');
  const { telephone } = useTelephoneStore();
  const { role } = useRoleStore();
  const { promocode } = usePromocodeStore();
  const { signUp, isAuthLoading } = useAuthController();
  const { allService } = useServiceController();
  const serviceOptions = Array.isArray(allService)
    ? allService.map((service) => ({
        label: service.name,
        value: service.id,
      }))
    : [];
  // console.log(allService)
  const { petTypes } = usePetTypesController();
  const petTypeOptions = Array.isArray(petTypes)
    ? petTypes.map((pet) => ({
        label: pet.type,
        value: pet.id,
      }))
    : [];
  // console.log(petTypes)

  // const formatInterval = (value: any) => {
  //   if (!value) return '';

  //   // Массив сокращений дней недели
  //   const daysMap = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  //   const selectedDays = value.days?.map((day: any) => daysMap[day]) || [];
  //   const daysString = selectedDays.join(', ');

  //   // Преобразование времени из формата ISO
  //   const formatTime = (isoString: any) => {
  //     const date = new Date(isoString);
  //     const hours = date.getHours().toString().padStart(2, '0');
  //     const minutes = date.getMinutes().toString().padStart(2, '0');
  //     return `${hours}:${minutes}`;
  //   };

  //   const timeString = value.start && value.end
  //     ? `${formatTime(value.start)} - ${formatTime(value.end)}`
  //     : '';

  //   return `${daysString} ${timeString}`;
  // };
  const { control, handleSubmit, formState, reset, watch, setValue } =
    useForm<FormData>({
      defaultValues: {
        image: null,
        name: '',
        telephone: telephone as string,
        email: '',
        city: '',
        start: '',
        end: '',
        days: [],
        petTypes: [],
        services: [],
        role: role as Role,
        promocode: promocode as string,
      },
    });

  const days = watch('days');
  const start = watch('start');
  const end = watch('end');

  const formatInterval = () => {
    if (!days || days.length === 0 || !start || !end) {
      return ''; // Возвращаем пустую строку, если интервал не заполнен
    }

    const daysMap = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const selectedDays = Array.isArray(days)
      ? days.map((day) => daysMap[day - 1])
      : [];
    const daysString = selectedDays.join(', ');

    const formatTime = (isoString: string) => {
      const date = new Date(isoString);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const timeString =
      start && end ? `${formatTime(start)} - ${formatTime(end)}` : '';
    return `${daysString} ${timeString}`;
  };
  const intervalDisplay = formatInterval();

  const validateInterval = () => {
    if (!days || days.length === 0 || !start || !end) {
      setIntervalError('Пожалуйста, заполните интервал работы'); // Устанавливаем текст ошибки
      return false;
    }
    return true; // Не сбрасываем ошибку здесь
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data: SignUpDto) => {
    if (!validateInterval()) {
      return;
    }
    setIntervalError('');

    const formData = new FormData();

    if (data.image) {
      formData.append('image', {
        uri: data.image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
    } else {
      formData.append('image', '');
    }

    formData.append('name', data.name);
    formData.append('telephone', data.telephone);
    formData.append('email', data.email);
    formData.append('city', data.city);
    formData.append('days', JSON.stringify(data.days));
    formData.append('start', data.start ? formatTime(data.start) : '');
    formData.append('end', data.end ? formatTime(data.end) : '');

    if (data.petTypes) {
      data.petTypes.forEach((petTypeId) => {
        formData.append('petTypes', petTypeId);
      });
    }

    if (data.services) {
      data.services.forEach((serviceId) => {
        formData.append('services', serviceId);
      });
    }

    formData.append('role', data.role);
    formData.append('promocode', data.promocode || '');

    try {
      const response = await signUp(formData);
      navigation.navigate('appStack');
    } catch (error) {
      console.error('Error during sign up:', error);
    }
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
          <View style={{ gap: 2, width: '100%', zIndex: 98 }}>
            <Dropdown
              placeholder="Выберите свой город"
              multiple={false}
              options={option}
              selectedValue={value}
              onSelect={onChange}
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
          <View style={{ gap: 2, width: '100%', zIndex: 97 }}>
            <Dropdown
              placeholder="Услуги"
              multiple={true}
              options={serviceOptions}
              selectedValue={value}
              onSelect={onChange}
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
        name="petTypes"
        control={control}
        rules={{ required: 'Выбор питомца обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 95 }}>
            <Dropdown
              placeholder="Животные"
              multiple={true}
              options={petTypeOptions}
              selectedValue={value}
              onSelect={onChange}
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

      <View style={{ gap: 2, width: '100%' }}>
        <Drawer
          close={'Сохранить'}
          hasBackdrop={true}
          trigger={
            <Input
              value={intervalDisplay || 'Выберите интервал для работы'}
              editable={false}
              placeholder="Выберите интервал для работы"
              style={[intervalError ? styles.inputError : styles.input]}
            />
          }
        >
          <SelectInterval
            onChange={(value) => {
              setValue('days', value.days);
              setValue('start', value.start);
              setValue('end', value.end);
            }}
            value={{
              days,
              start,
              end,
            }}
          />
        </Drawer>
        {intervalError && (
          <Error
            style={{ justifyContent: 'flex-start' }}
            title={intervalError}
          />
        )}
      </View>

      <Button isLoading={isAuthLoading} onPress={handleSubmit(onSubmit)}>
        Продолжить
      </Button>
    </View>
  );
}

export default Form;
