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
type MyAddressRouteProp = RouteProp<Screens, 'myAddress'>;
function MyAddress() {
  const route = useRoute<MyAddressRouteProp>();
  const { lat, lon, address } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Автоматически открываем Drawer при монтировании компонента
    setIsModalVisible(true);
  }, []);
  const addres = address;
  const [city, street, houseNumber] = address.split(', ');
  // const formatAddress = (fullAddress: string) => {
  //   const parts = fullAddress.split(',').map((part) => part.trim());
  //   const city = parts[0]; // Первый элемент - это город
  //   const streetAndNumber = parts[1] || ''; // Второй элемент - это улица и номер дома

  //   const formattedStreet = streetAndNumber.replace(/улица/i, 'ул.').trim();

  //   return {
  //     city,
  //     street: formattedStreet,
  //   };
  // };

  // const { city, street } = formatAddress(address);
  return (
    <>
      <MyAddressMap
        title="Адрес"
        apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
        initialLocation={{ lat: lat, lon: lon }}
        markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
      />
      <Drawer
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        close="Сохранить"
        hasBackdrop={false}
      >
        <View>
          <InputInfo title="Город" description={city} editable={false} />
          <InputInfo
            title="Улица"
            description={`${street}, ${houseNumber}`}
            editable={false}
          />
          <InputInfo
            title="Квартира/офис"
            description={'Квартира/офис'}
            keyboardType="numeric"
            maxLength={4}
          />
          <InputInfo
            title="Подъезд"
            description={'Номер подъезда'}
            keyboardType="numeric"
            maxLength={2}
          />
          <InputInfo
            title="Код домофона"
            description={'Код домофона'}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
      </Drawer>
    </>
  );
}

export default MyAddress;
