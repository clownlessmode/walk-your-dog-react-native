import { Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import { usePetTypesController } from '@entity/pet-types/pet-types.controller';
import { useBreedsController } from '@entity/breeds/breeds.controller';
import { useVaccinesController } from '@entity/vaccines/vaccines.controller';
import ImagePicker from '@shared/ui/image-picker/ImagePicker';
import Input from '@shared/ui/input/Input';
import Dropdown from '@shared/ui/dropdown/Dropdown';
import { useEffect, useState } from 'react';
import Drawer from '@shared/ui/drawer/Drawer';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '@shared/ui/button/Button';
import globalStyles from '@shared/constants/globalStyles';
import Switch from '@shared/ui/switch/Switch';
import { useAuthPetController } from '@entity/pets/pet.controller';
import useUserStore from '@entity/users/user.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Error from '@shared/ui/error/Error';
import AddForm from '@features/add-info-pet/Form';
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
interface FormData {
  image: any;
  name: any;
  breed: any;
  birthdate: any;
  owner: any;
  gender: any;
  sterilized: any;
  aggressive: any;
  pulls: any;
  health: any;
  additional: any;
  vaccine: any;
  petType: any;
}
interface ItemType {
  value: string;
  label: string;
}

function Form() {
  const navigation = useAppNavigation();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const { user, setIsRegistered } = useUserStore();
  const { signUpPet, isLoading } = useAuthPetController();
  const { petTypes } = usePetTypesController();
  const petTypeOptions = petTypes
    ? petTypes.map((petType) => ({
        value: petType.id,
        label: petType.type,
      }))
    : [];

  const { breedsByPetType, isBreedsLoading } =
    useBreedsController(selectedType);
  const [breeds, setBreeds] = useState<ItemType[]>([]);
  useEffect(() => {
    const breedsOptions = breedsByPetType
      ? breedsByPetType.map((breed) => ({
          value: breed.id,
          label: breed.name,
        }))
      : [{ value: 'null', label: '' }];
    setBreeds(breedsOptions);
  }, [breedsByPetType, selectedType]);

  const { vaccines } = useVaccinesController();
  const vaccineOptions = vaccines
    ? vaccines.map((vaccine) => ({
        value: vaccine.id,
        label: vaccine.name,
      }))
    : [];
  const { control, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      image: null,
      name: '',
      breed: '',
      birthdate: undefined,
      owner: user?.id as string,
      gender: 'MALE',
      sterilized: false,
      aggressive: false,
      pulls: false,
      health: '',
      additional: '',
      vaccine: [],
    },
  });

  const onSubmit = async (data: FormData) => {
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
    formData.append('breed', data.breed);
    formData.append(
      'birthdate',
      data.birthdate ? new Date(data.birthdate).toISOString().split('T')[0] : ''
    );
    formData.append('gender', data.gender);
    formData.append('sterilized', data.sterilized);
    formData.append('pulls', data.pulls);
    formData.append('aggressive', data.aggressive);
    formData.append('vaccine', data.vaccine);
    formData.append('health', data.health);
    formData.append('additional', data.additional);
    formData.append('owner', data.owner);
    await signUpPet(formData);
    // setIsRegistered(true)
    reset();
    // navigation.navigate("notificationsQuestion")
    navigation.navigate('appStack');
  };

  const toggleAdditionalInfo = () => {
    setShowAdditionalInfo((prev) => !prev);
  };
  return (
    <View style={styles.form}>
      <Controller
        name="image"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ImagePicker onChange={onChange} image={value} variant="pet" />
        )}
      />
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Имя питомца обязательно',
          pattern: {
            value: /^[A-Za-zА-Яа-яЁё]/,
            message: 'Имя питомца обязательно',
          },
        }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Имя друга"
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
        name="petType"
        control={control}
        rules={{ required: 'Выбор вида питомца обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 100 }}>
            <Dropdown
              placeholder="Вид питомца"
              multiple={false}
              options={petTypeOptions}
              selectedValue={value}
              onSelect={(selectedValue) => {
                onChange(selectedValue);
                setSelectedType(selectedValue as string);
              }}
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
        name="birthdate"
        control={control}
        rules={{ required: 'Выбор даты рождения питомца обязательно' }}
        render={({ field: { onChange, value }, fieldState }) =>
          Platform.OS === 'ios' ? (
            <Drawer
              close={'Готово'}
              trigger={
                <View style={{ gap: 2, width: '100%' }}>
                  <View
                    style={
                      fieldState.error
                        ? styles.errorInputForIos
                        : styles.inputForIos
                    }
                  >
                    <Text style={[globalStyles.text400]}>
                      {value
                        ? new Date(value).toLocaleDateString('ru-RU')
                        : 'Дата рождения'}
                    </Text>
                  </View>
                  {fieldState.error && (
                    <Error
                      style={{ justifyContent: 'flex-start' }}
                      title={fieldState.error.message}
                    />
                  )}
                </View>
              }
            >
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  // Обработка выбора даты
                  if (event.type === 'set' && selectedDate) {
                    onChange(selectedDate);
                  }
                }}
                textColor="black"
              />
            </Drawer>
          ) : (
            <>
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => setModalVisible(true)}
              >
                <View style={{ gap: 2, width: '100%' }}>
                  <Input
                    editable={false}
                    placeholder={
                      value
                        ? new Date(value).toLocaleDateString('ru-RU')
                        : 'Дата рождения'
                    }
                    error={!!fieldState.error}
                  />
                  {fieldState.error && (
                    <Error
                      style={{ justifyContent: 'flex-start' }}
                      title={fieldState.error.message}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {modalVisible && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    // Обработка выбора даты
                    if (event.type === 'set' && selectedDate) {
                      onChange(selectedDate);
                      setModalVisible(false);
                    }
                  }}
                />
              )}
            </>
          )
        }
      />
      <Controller
        name="breed"
        control={control}
        rules={{ required: 'Выбор породы питомца обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 99 }}>
            <Dropdown
              emptyLabel="Выберите сначала вид питомца"
              isLoading={isBreedsLoading}
              placeholder="Порода питомца"
              multiple={false}
              options={breeds}
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
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Пол питомца"
            options={[
              { label: 'Мальчик', value: 'MALE' },
              { label: 'Девочка', value: 'FEMALE' },
            ]}
          />
        )}
      />
      {(selectedType === 'c1f5e962-4045-4cbb-8254-f056df04a6da' ||
        selectedType === 'e819ae59-39c8-48b4-bbfa-794f58eaf3aa') && (
        <>
          <Controller
            control={control}
            name="sterilized"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onChange={onChange}
                title="Стерилизация/Кастрация"
                options={[
                  { label: 'Да', value: true },
                  { label: 'Нет', value: false },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="pulls"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onChange={onChange}
                title="Тянет поводок"
                options={[
                  { label: 'Да', value: true },
                  { label: 'Нет', value: false },
                ]}
              />
            )}
          />
        </>
      )}
      <Controller
        control={control}
        name="aggressive"
        render={({ field: { onChange, value } }) => (
          <Switch
            value={value}
            onChange={onChange}
            title="Агрессивен"
            options={[
              { label: 'Да', value: true },
              { label: 'Нет', value: false },
            ]}
          />
        )}
      />
      <Controller
        name="vaccine"
        control={control}
        rules={{ required: 'Выбор прививки обязателен' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%', zIndex: 98 }}>
            <Dropdown
              placeholder="Прививки"
              multiple={true}
              options={vaccineOptions}
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
        name="health"
        control={control}
        rules={{ required: 'Информация о общем здоровье обязательна' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <View style={{ gap: 2, width: '100%' }}>
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Общее здоровье"
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
        name="additional"
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Дополнительная информация"
          />
        )}
      />
      <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
        Подтвердить
      </Button>
    </View>
  );
}

export default Form;
