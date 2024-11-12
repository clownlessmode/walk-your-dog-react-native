import useUserStore from '@entity/users/user.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ImageRecord from '@shared/ui/image-record/ImageRecord';
import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {
  setModalVisible?: (visible: boolean) => void; // Типизация функции
}
function AddRecord({ setModalVisible }: Props) {
  const { user } = useUserStore();
  const navigation = useAppNavigation();

  const handlePress = (route: any) => {
    if (!user) return;

    const hasPets = user.pets && user.pets.length > 0;
    const hasAddresses = user.meta?.addresses && user.meta.addresses.length > 0;

    if (!hasPets || !hasAddresses) {
      if (!hasPets) {
        Toast.show({
          type: 'error',
          text1: 'Проверьте необходимые данные',
          text2: 'Необходимо добавить питомца',
        });
        navigation.navigate('myPets');
      }
      if (!hasAddresses) {
        Toast.show({
          type: 'error',
          text1: 'Проверьте необходимые данные',
          text2: 'Необходимо добавить адрес',
        });
        navigation.navigate('myAddresses');
      }
    } else {
      navigation.navigate(route);
      if (setModalVisible) setModalVisible(false);
    }
  };

  return (
    <View style={{ alignItems: 'center', gap: 20 }}>
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>
        Добавить новую запись
      </Text>
      <ImageRecord
        onPress={() => handlePress('reminder')}
        variant="reminder"
        title="Напоминание"
        description="Не забудьте о записи к врачу о тренировке с кинологом или регулярной стрижке когтей"
      />
      <ImageRecord
        onPress={() => handlePress('service')}
        variant="service"
        title="Запись на услугу"
        description="Закажите выгул, ситтера, няню 
        или кинолога от нашего сервиса"
      />
    </View>
  );
}

export default AddRecord;
