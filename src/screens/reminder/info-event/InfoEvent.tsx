import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import useSelectPetStore from '../select-pet/select-pet.store';
import { Text, View } from 'react-native';
import PetInfo from '@shared/ui/pet-info/PetInfo';
import useReminderStore from '../reminder.store';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import SelectedTime from '@features/selected-time/SelectedTime';
import SelectedRepeat from '@features/selected-repeat/SelectedRepeat';
import SelectedRemind from '@features/selected-remind/SelectedRemind';
import { Controller, useForm } from 'react-hook-form';
import Button from '@shared/ui/button/Button';
import useUserStore from '@entity/users/user.store';
import { useReminderController } from '@entity/reminders/reminders.controller';
function InfoEvent() {
  const { user } = useUserStore();
  const { selectPet } = useSelectPetStore();
  const { reminder } = useReminderStore();
  const { createReminder } = useReminderController()
  let petIds: string[] = [];

  if (Array.isArray(selectPet)) {
    petIds = selectPet.map((pet) => pet.id);
  } else if (selectPet) {
    petIds = [selectPet.id];
  }
  const { control, handleSubmit } = useForm({
    defaultValues: {
      user: user?.id,
      datetime: '',
      reminderType: reminder?.value,
      pet: petIds,
      remind: 0,
      repeatDays: [],
    },
  });

  const onSubmit = async (data: any) => {
    const response = await createReminder(data)
    console.log('Заполненные данные:', response);
  };
  return (
    <ScreenContainer style={{ gap: 20 }}>
      <Header before={<GoBack />}>Информация о событии</Header>
      <View>
        <View style={styles.blockEvent}>
          <Text style={[globalStyles.text500, { fontSize: 12, opacity: 0.5 }]}>
            Название события
          </Text>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>
            {reminder?.title}
          </Text>
        </View>
        {Array.isArray(selectPet) ? (
          <Text>Стоит общее напоминание</Text>
        ) : (
          selectPet && <PetInfo pet={selectPet} />
        )}
        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="datetime"
            render={({ field: { onChange, value } }) => (
              <SelectedTime onChange={onChange} value={value} />
            )}
          />
          <Controller
            control={control}
            name="repeatDays"
            render={({ field: { onChange, value } }) => (
              <SelectedRepeat onChange={onChange} value={value} />
            )}
          />
          <Controller
            control={control}
            name="remind"
            render={({ field: { onChange, value } }) => (
              <SelectedRemind onChange={onChange} value={value} />
            )}
          />
          <Button onPress={handleSubmit(onSubmit)}>PRIVET</Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

export default InfoEvent;
