import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import useMapStore, { Location } from '@screens/map/map.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import AddMore from '@shared/ui/add-more/AddMore';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import ServiceInput from '@shared/ui/service-input/ServiceInput';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

function MyAdresses() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const navAddress = (location: Location) => {
    navigation.navigate('myAddress', {
      address: location.address,
      lat: location.lat,
      lon: location.lon,
      id: location.id,
      name: location.name || '',
      apartment: location.apartment || '',
      entrance: location.entrance || '',
      doorcode: location.doorcode || '',

    });
  };
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Мои адреса</Header>
      <View style={{ gap: 20 }}>
        {user?.meta.addresses.length === 0 && (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              У вас еще нет адресов
            </Text>
          </View>
        )}
        {user?.meta.addresses.map((location) => (
          <TouchableOpacity
            key={location.address}
            onPress={() => navAddress(location)}
          >
            <ServiceInput description={location.address} title="Адрес" />
          </TouchableOpacity>
        ))}

        <AddMore
          onPress={() => navigation.navigate('map')}
          title="Добавить адрес"
        />
      </View>
    </ScreenContainer>
  );
}

export default MyAdresses;
