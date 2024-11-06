import YaMap from '@shared/ui/map/Map';
import React, { useState } from 'react';
import useMapStore from './map.store';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@shared/ui/button/Button';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { useAdressesController } from '@entity/adresses/adresses.controller';
import { useForm } from 'react-hook-form';
import useUserStore from '@entity/users/user.store';
import styles from './styles';

interface Location {
  address: string;
  lat: number;
  lon: number;
}
function Map() {
  const navigation = useAppNavigation();
  const { createAdresses, isLoading } = useAdressesController();
  const {user} = useUserStore()
  const { setMap, setAddress } = useMapStore();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const { handleSubmit } = useForm();

  const handleLocationSelect = (location: any) => {
    console.log('Выбранное местоположение:', location);
    setSelectedAddress(location.address);
    const lat = location.coordinates.lat;
    const lon = location.coordinates.lon;
    const address = location.address;
    setSelectedLocation({ address, lat, lon });
  };

  const onSubmit = async () => {
    if (selectedLocation) {
      const { address, lat, lon } = selectedLocation;
      const userId = user?.id;
      const adressesDto = {
        address,
        lat,
        lon,
        userId,
      };
      try {
        const response = await createAdresses(adressesDto);
        setMap(address); 
        setAddress({lat, lon, address})
        navigation.goBack();
        console.log('Адрес сохранен:', adressesDto);
      } catch (error) {
        console.error('Ошибка при сохранении адреса:', error);
      }
    }
  };
  return (
    <>
      <YaMap
        apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
        mode="edit"
        initialLocation={{ lat: 55.751574, lon: 37.573856 }}
        onLocationSelect={handleLocationSelect}
        markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
      />
      <View style={styles.modal}>
        <Text
          style={[globalStyles.text500, { fontSize: 16, textAlign: 'center' }]}
        >
          {selectedAddress}
        </Text>
        <View
          style={{
            backgroundColor: '#EDEDED',
            height: 1,
            width: '100%',
            borderRadius: 16,
          }}
        ></View>
        <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>Выбрать этот адрес</Button>
      </View>
    </>
  );
}

export default Map;
