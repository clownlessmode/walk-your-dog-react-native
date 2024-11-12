import YaMap from '@shared/ui/map/Map';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import useMapStore from './map.store';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '@shared/ui/button/Button';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { useAdressesController } from '@entity/adresses/adresses.controller';
import { useForm } from 'react-hook-form';
import useUserStore from '@entity/users/user.store';
import styles from './styles';
import { useUserController } from '@entity/users/user.controller';
import { FontAwesome } from '@expo/vector-icons';
import WebView from 'react-native-webview';

interface Location {
  address: string;
  lat: number;
  lon: number;
}

function Map() {
  const navigation = useAppNavigation();
  const { createAdresses, isLoading } = useAdressesController();
  const { user, setUser } = useUserStore();
  const { getMe } = useUserController(); // Теперь без user?.id
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lon: number } | undefined
  >(undefined);

  useEffect(() => {
    const getLocation = async () => {
      // Запрос разрешения на доступ к местоположению
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setInitialLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  const [isLocating, setIsLocating] = useState(false);
  const yaMapRef = useRef<WebView>(null);
  const getUserLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLocating(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      // Устанавливаем начальное положение и центрируем карту на текущем местоположении
      setInitialLocation({ lat, lon });
      yaMapRef.current?.injectJavaScript(`setMapCenter(${lat}, ${lon});`);
    } catch (error) {
      console.error('Ошибка при запросе геопозиции:', error);
    } finally {
      setIsLocating(false); // Скрываем лоадер после завершения запроса
    }
  };

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
        await createAdresses(adressesDto);
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
        initialLocation={initialLocation}
        onLocationSelect={handleLocationSelect}
        markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
      />
       <TouchableOpacity style={styles.locationButton} onPress={getUserLocation}>
        {isLocating ? (
          <ActivityIndicator size="small" color="black" /> 
        ) : (
          <FontAwesome name="location-arrow" size={24} color="black" />
        )}
      </TouchableOpacity>
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
        <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
          Выбрать этот адрес
        </Button>
      </View>
    </>
  );
}

export default Map;
