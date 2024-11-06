import GoBack from '@features/go-back/GoBack';
import useMapStore, { Location } from '@screens/map/map.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import AddMore from '@shared/ui/add-more/AddMore';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import ServiceInput from '@shared/ui/service-input/ServiceInput';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

function MyAdresses() {
  const navigation = useAppNavigation();
  const { addresses } = useMapStore();
  const navAddress = (location: Location) => {
    navigation.navigate('myAddress', {
      address: location.address,
      lat: location.lat,
      lon: location.lon,
    });
  };
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Мои адреса</Header>
      <View style={{ gap: 20 }}>
        {addresses.map((location) => (
          <TouchableOpacity
            key={location.address}
            onPress={() => navAddress(location)}
          >
            <ServiceInput description={location.address} title="Адрес" />
          </TouchableOpacity>
        ))}

        <AddMore title="Добавить адрес" />
      </View>
    </ScreenContainer>
  );
}

export default MyAdresses;
