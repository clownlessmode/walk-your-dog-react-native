import YaMap from '@shared/ui/map/Map';
import React, { useState } from 'react';
import useMapStore from './map.store';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@shared/ui/button/Button';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

function Map() {
  const navigation = useAppNavigation()
    const { setMap } = useMapStore()
    const [selectedAddress, setSelectedAddress] = useState(null);
    const handleLocationSelect = (location: any) => {
        console.log('Выбранное местоположение:', location);
        setSelectedAddress(location.address); // Сохраняем адрес в локальное состояние
      };
      const handleSelectAddress = () => {
        if (selectedAddress) {
          setMap(selectedAddress); // Сохраняем адрес в сторе
          navigation.goBack()
          console.log('Адрес сохранен:', selectedAddress);
        }
      };
  return (
    <>
      <YaMap
        apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
        mode="edit"
        initialLocation={{ lat: 55.751574, lon: 37.573856 }}
        onLocationSelect={handleLocationSelect}
        markerIcon='https://i.ibb.co/Mfj99Lx/Pin-fill.png'
      />
        <View style={styles.modal}>
          <Text style={[globalStyles.text500, {fontSize: 16, textAlign: "center"}]}>{selectedAddress}</Text>
          <View style={{backgroundColor: "#EDEDED", height: 1, width: "100%", borderRadius: 16}}></View>
          <Button onPress={handleSelectAddress}>Выбрать этот адрес</Button>
        </View>
    </>
  );
}
const styles = StyleSheet.create({
    modal: {
      gap: 16,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#fff',
      paddingVertical: 36,
      paddingHorizontal: 15,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

export default Map;
