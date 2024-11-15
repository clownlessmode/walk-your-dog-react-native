import { RouteProp, useRoute } from '@react-navigation/native';
import { Screens } from '@shared/types/screens.type';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import YaMap from '@shared/ui/map/Map';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import MyAddressMap from '@shared/ui/my-address-map/MyAddressMap';
import { Text, View } from 'react-native';
import Drawer from '@shared/ui/drawer/Drawer';
import InputInfo from '@shared/ui/input-info/InputInfo';
import { Controller, useForm } from 'react-hook-form';
import Error from '@shared/ui/error/Error';
import Button from '@shared/ui/button/Button';
import { useAdressesController } from '@entity/adresses/adresses.controller';
import useUserStore from '@entity/users/user.store';
type MyAddressRouteProp = RouteProp<Screens, 'myAddress'>;
function MyAddress() {
  const route = useRoute<MyAddressRouteProp>();
  const { user } = useUserStore();
  const { lat, lon, address, id, name, apartment, doorcode, entrance } =
    route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(true);
  }, []);
  const [city, street, houseNumber] = address.split(', ');
  const { isUpdateLoading, updateAddress } = useAdressesController(id);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      city: '',
      street: '',
      name: name || '',
      apartment: apartment || '',
      entrance: entrance || '',
      doorcode: doorcode || '',
    },
  });
  const onSubmit = async (data: any) => {
    const response = await updateAddress(data);
    console.log(response);
  };

  const handleMarkerPress = () => {
    setIsModalVisible(true);
  };
  return (
    <>
      <MyAddressMap
        title="Адрес"
        apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
        initialLocation={{ lat: lat, lon: lon }}
        markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
        onMarkerPress={() => {
          setIsModalVisible(true);
        }}
      />
      <Drawer
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        hasBackdrop={false}
      >
        <View>
          <InputInfo title="Город" description={city} editable={false} />
          <InputInfo
            title="Улица"
            description={`${street}, ${houseNumber}`}
            editable={false}
          />
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Название адреса обязательно',
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <View style={{ width: '100%' }}>
                <InputInfo
                  value={value}
                  onChangeText={onChange}
                  title="Название"
                  description={'Название'}
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
            name="apartment"
            control={control}
            rules={{
              required: 'Номер квартиры обязателен',
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <View style={{ width: '100%' }}>
                <InputInfo
                  value={value}
                  onChangeText={onChange}
                  title="Квартира/офис"
                  description={'Квартира/офис'}
                  keyboardType="numeric"
                  maxLength={4}
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
            name="entrance"
            control={control}
            rules={{
              required: 'Номер подъезда обязателен',
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <View style={{ width: '100%' }}>
                <InputInfo
                  value={value}
                  onChangeText={onChange}
                  title="Подъезд"
                  description={'Подъезд'}
                  keyboardType="numeric"
                  maxLength={2}
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
            name="doorcode"
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value }, fieldState }) => (
              <View style={{ width: '100%' }}>
                <InputInfo
                  value={value}
                  onChangeText={onChange}
                  title="Код домофона"
                  description={'Код домофона'}
                  keyboardType="numeric"
                  maxLength={5}
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
          <Button isLoading={isUpdateLoading} onPress={handleSubmit(onSubmit)}>
            Изменить
          </Button>
        </View>
      </Drawer>
    </>
  );
}

export default MyAddress;
