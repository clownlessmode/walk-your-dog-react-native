import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import useUserStore from '@entity/users/user.store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GoBack from '@features/go-back/GoBack';
import useServiceStore from '@screens/service/service.store';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import Input from '@shared/ui/input/Input';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import { translateService } from '@shared/utils/translateService';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Button from '@shared/ui/button/Button';
import ConditionsApp from '@features/conditions-app/ConditionsApp';

function DetailsService() {
  const { user } = useUserStore();
  const { selectedPet, services } = useServiceStore();
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0);
  return (
    <ScreenContainer style={{ gap: 10 }}>
      <Header before={<GoBack />}>Детали записи</Header>
      <UserProfile
        name={user ? user?.meta.name : ''}
        description={user ? user?.meta.email : ''}
        image={user?.meta.image}
        additional={
          <MaterialCommunityIcons
            name="chevron-right"
            color={'#545454'}
            size={16}
          />
        }
      />
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>Комментарий</Text>
      <Input placeholder="Дополнительная информация" />
      {selectedPet && <PetInfo pet={selectedPet} />}
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={[globalStyles.text500]}>
              {translateService(service.service)}
            </Text>
            <Text>{service.price} ₽</Text>
          </View>
        ))}
        <View style={styles.line}></View>
      </View>
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>
        Итого за услуги {`+${totalPrice} ₽`}
      </Text>
      <View style={styles.allPrice}>
        <Text style={[globalStyles.text500]}>
          Общая стоимость {`${totalPrice} ₽`}
        </Text>
      </View>
      <View style={{ alignItems: 'center', gap: 12 }}>
        <ConditionsApp />
        <Button>Далее</Button>
      </View>
    </ScreenContainer>
  );
}

export default DetailsService;
