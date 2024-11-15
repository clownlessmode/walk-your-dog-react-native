import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import useReminderStore from '@screens/reminder/reminder.store';
import CalendarWidgets from '@widgets/calendar/Calendar';
import Drawer from '@shared/ui/drawer/Drawer';
import ServiceInput from '@shared/ui/service-input/ServiceInput';
import SelectedTime from '@features/selected-time/SelectedTime';
import SelecteadRepeat from '@features/selected-repeat/SelectedRepeat';
import SelectedRemind from '@features/selected-remind/SelectedRemind';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Button from '@shared/ui/button/Button';

function AddWindowEvent() {
  const { reminder } = useReminderStore();
  const { control, handleSubmit } = useForm({});

  const [selectedDateDescription, setSelectedDateDescription] = useState(
    format(new Date(), 'd MMMM, HH:mm', { locale: ru })
  );

  const handleDateChange = (dateValue: any) => {
    setSelectedDateDescription(
      format(new Date(dateValue), 'd MMMM, HH:mm', { locale: ru })
    );
  };
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Добавить окна для записи</Header>
      <View style={styles.blockEvent}>
        <Text style={[globalStyles.text500, { fontSize: 12, opacity: 0.5 }]}>
          Название события
        </Text>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>
          {reminder?.title}
        </Text>
      </View>
      <CalendarWidgets />
      <View style={{ gap: 10, paddingTop: 10, paddingBottom: 20 }}>
        <Drawer
          close={<Button>Сохранить</Button>}
          hasBackdrop={true}
          trigger={
            <ServiceInput title="Дата" description={selectedDateDescription} />
          }
        >
          <Controller
            control={control}
            name="selectedDate"
            render={({ field: { onChange, value } }) => (
              <SelectedTime
                onChange={(dateValue) => {
                  onChange(dateValue);
                  handleDateChange(dateValue);
                }}
                value={value}
              />
            )}
          />
        </Drawer>
        <Controller
          control={control}
          name="repeatDays"
          render={({ field: { onChange, value } }) => (
            <SelecteadRepeat onChange={onChange} value={value} />
          )}
        />
        <Controller
          control={control}
          name="reminderTime"
          render={({ field: { onChange, value } }) => (
            <SelectedRemind onChange={onChange} value={value} />
          )}
        />
      </View>
      <Button>Подтвердить</Button>
    </ScreenContainer>
  );
}

export default AddWindowEvent;
