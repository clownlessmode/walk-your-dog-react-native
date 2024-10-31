import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ImageRecord from '@shared/ui/image-record/ImageRecord';
import React from 'react';
import { Text, View } from 'react-native';

function AddRecord() {
  const navigation = useAppNavigation();
  return (
    <View style={{ alignItems: 'center', gap: 20 }}>
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>
        Добавить новую запись
      </Text>
      <ImageRecord
        onPress={() => navigation.navigate('reminder')}
        variant="reminder"
        title="Напоминание"
        description="Не забудьте о записи к врачу о тренировке с кинологом или регулярной стрижке когтей"
      />
      <ImageRecord
        variant="service"
        title="Запись на услугу"
        description="Закажите выгул, ситтера, няню 
        или кинолога от нашего сервиса"
      />
    </View>
  );
}

export default AddRecord;
