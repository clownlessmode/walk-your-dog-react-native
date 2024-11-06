import useUserStore from '@entity/users/user.store';
import SelectPet from '@features/select-pet/SelectPet';
import SelectedTime from '@features/selected-time/SelectedTime';
import useMapStore from '@screens/map/map.store';
import useServiceStore from '@screens/service/service.store';
import globalStyles from '@shared/constants/globalStyles';
import AddService from '@shared/ui/add-service/AddService';
import Button from '@shared/ui/button/Button';
import Drawer from '@shared/ui/drawer/Drawer';
import RadioButton from '@shared/ui/radio-button/RadioButton';
import ServiceInput from '@shared/ui/service-input/ServiceInput';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import styles from './styles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

function Form() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { map } = useMapStore();
  const {
    setService,
    removeService,
    setAddress,
    setDate,
    services,
    date,
    address,
    setSelectedPet,
    selectedPet,
  } = useServiceStore();

  useEffect(() => {
    if (user && !selectedPet && user.pets?.length > 0) {
      setSelectedPet(user.pets[0]);
    }
  }, [selectedPet, user?.pets, setSelectedPet]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      pet: '',
      walking: false,
      washPaws: false,
      feed: false,
      babysitter: false,
      sitter: false,
      training: false,
      grooming: false,
      address: map,
      date: '',
    },
  });

  const [selectedAnimal, setSelectedAnimal] = useState(user?.pets[0]);
  const [selectedDateDescription, setSelectedDateDescription] = useState(
    format(new Date(), 'd MMMM, HH:mm', { locale: ru })
  );

  const handleDateChange = (dateValue: any) => {
    setSelectedDateDescription(
      format(new Date(dateValue), 'd MMMM, HH:mm', { locale: ru })
    );
    setDate(dateValue);
  };

  const handleAnimalSelect = (pet: any) => {
    setSelectedAnimal(pet);
    setSelectedPet(pet);
  };

  const handleServiceToggle = (service: any, price: any, selected: any) => {
    if (selected) {
      setService({ service, price });
    } else {
      removeService(service);
    }
  };

  const onSubmit = (data: any) => {
    setAddress(data.address);
    setDate(data.date);
    navigation.navigate('detailsService')
    console.log('Selected Services:', services);
    console.log('Selected Address:', address);
    console.log('Selected Date:', date);
    console.log('Selected pet:', selectedPet);
  };

  return (
    <>
      <View style={styles.wrapperColor}>
        <View style={{ paddingHorizontal: 15, gap: 16 }}>
          <SelectPet onPetSelect={handleAnimalSelect} />

          <Controller
            control={control}
            name="walking"
            render={({ field: { onChange, value } }) => (
              <RadioButton
                price={450}
                showInfoButton={true}
                title="Выгул"
                checked={value}
                onPress={() => {
                  onChange(!value);
                  handleServiceToggle('walking', 450, !value);
                }}
              />
            )}
          />
          <View style={{ gap: 10 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Дополнительно
            </Text>
            <View style={styles.addBlock}>
              <Controller
                control={control}
                name="washPaws"
                render={({ field: { onChange, value } }) => (
                  <AddService
                    checked={value}
                    title="Помыть лапы"
                    price={150}
                    onPress={() => {
                      onChange(!value);
                      handleServiceToggle('washPaws', 150, !value);
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="feed"
                render={({ field: { onChange, value } }) => (
                  <AddService
                    checked={value}
                    title="Покормить"
                    price={250}
                    onPress={() => {
                      onChange(!value);
                      handleServiceToggle('feed', 250, !value);
                    }}
                  />
                )}
              />
            </View>
          </View>
          <View style={{ gap: 16 }}>
            <View style={styles.line}></View>
            <Controller
              control={control}
              name="babysitter"
              render={({ field: { onChange, value } }) => (
                <RadioButton
                  price={850}
                  showInfoButton={true}
                  title="Няня"
                  checked={value}
                  onPress={() => {
                    onChange(!value);
                    handleServiceToggle('babysitter', 850, !value);
                  }}
                />
              )}
            />
            <View style={styles.line}></View>
            <Controller
              control={control}
              name="sitter"
              render={({ field: { onChange, value } }) => (
                <RadioButton
                  price={450}
                  showInfoButton={true}
                  title="Ситтер"
                  checked={value}
                  onPress={() => {
                    onChange(!value);
                    handleServiceToggle('sitter', 450, !value);
                  }}
                />
              )}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Дополнительно
            </Text>
            <View style={styles.addBlock}>
              <Controller
                control={control}
                name="training"
                render={({ field: { onChange, value } }) => (
                  <AddService
                    checked={value}
                    title="Дрессировка"
                    price={150}
                    onPress={() => {
                      onChange(!value);
                      handleServiceToggle('training', 150, !value);
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="grooming"
                render={({ field: { onChange, value } }) => (
                  <AddService
                    checked={value}
                    title="Грумминг"
                    price={1250}
                    onPress={() => {
                      onChange(!value);
                      handleServiceToggle('grooming', 1250, !value);
                    }}
                  />
                )}
              />
            </View>
          </View>
          <Drawer
            trigger={
              <ServiceInput
                title="Дата"
                description={selectedDateDescription}
              />
            }
          >
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <SelectedTime
                  onChange={(dateValue) => {
                    onChange(dateValue);
                    handleDateChange(dateValue);
                  }}
                  value={value}
                />
              )}
            />
          </Drawer>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Button onPress={handleSubmit(onSubmit)}>Далее</Button>
      </View>
    </>
  );
}

export default Form;
