import { Alert, Vibration, View } from 'react-native';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import Input from '@shared/ui/input/Input';
import useTelephoneStore from '@screens/auth/telephone.store';
import Dropdown from '@shared/ui/dropdown/Dropdown';
import option from './option';
import Button from '@shared/ui/button/Button';
import { SignUpDto } from '@entity/auth/model/auth.interface';
import useRoleStore from '@screens/auth/role.store';
import { Role } from '@entity/users/model/role.enum';
import { useAuthController } from '@entity/auth/auth.controller';
import Error from '@shared/ui/error/Error';
import { AntDesign } from '@expo/vector-icons';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ImagePicker from '@shared/ui/image-picker/ImagePicker';
import usePromocodeStore from '@screens/auth/promocode.store';
import useUserStore from '@entity/users/user.store';

interface FormData {
  image: any;
  name: any;
  telephone: any;
  email: any;
  city: any;
  role: any;
  promocode: any;
}
function Form() {
  const navigation = useAppNavigation();
  const {setUser, setToken} = useUserStore()
  const { telephone } = useTelephoneStore();
  const { role } = useRoleStore();
  const { promocode } = usePromocodeStore()
  const { signUp, isAuthLoading } = useAuthController();
  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      image: null,
      name: '',
      telephone: telephone as string,
      email: '',
      city: '',
      role: role as Role,
      promocode: promocode as string
    },
  });

  if (Object.keys(formState.errors).length > 0) {
    Vibration.vibrate();
  }

  const onSubmit = async (data: SignUpDto) => {
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
    formData.append('role', data.role);
    formData.append('promocode', data.promocode as string);
    const res = await signUp(formData);
    setUser(res.user)
    setToken(res.accessToken)
    reset()
    navigation.navigate("signUpPet")
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
        name="city"
        control={control}
        rules={{ required: 'Выбор города обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex:9999 }}>
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
      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={isAuthLoading}
        icon={<AntDesign name="arrowright" size={18} color="white" />}
      >
        Рассказать о питомце
      </Button>
    </View>
  );
}

export default Form;
