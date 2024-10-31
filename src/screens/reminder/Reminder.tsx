import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import RemindersBlock from '@shared/ui/reminders-block/RemindersBlock';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import useReminderStore from './reminder.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
const blocksData = [
  { title: 'Записаться на услугу', value: 'SUBSCRIBE' },
  { title: 'Вакцинация', value: 'VACCINATION' },
  { title: 'Прививки от клещей и глистов', value: 'PRIVIVKA' },
  { title: 'Ветеринар', value: 'VETERINAR' },
  { title: 'Купание', value: 'BATHING' },
  { title: 'Груминг', value: 'GROOMING' },
  { title: 'Чистка ушей', value: 'EARS' },
  { title: 'Стрижка когтей', value: 'NAILS' },
];
function Reminder() {
  const navigation = useAppNavigation();
  const { setReminder } = useReminderStore();
  const handleReminderPress = (title: string, value: string) => {
    setReminder({title, value});
    navigation.navigate('selectPet');
  };
  const beforeHeaderBlocks = blocksData.slice(0, 4);
  const afterHeaderBlocks = blocksData.slice(4);

  const renderBlocks = (blocks: any) => (
    <View style={styles.rowContainer}>
      {blocks.map((block: any, index: any) => (
        <RemindersBlock
          key={index}
          title={block.title}
          onPress={() => handleReminderPress(block.title, block.value)}
        />
      ))}
    </View>
  );
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Напоминание</Header>
      <Text style={[globalStyles.text600, styles.sectionHeader]}>
        Важные события
      </Text>
      {renderBlocks(beforeHeaderBlocks)}
      <Text style={[globalStyles.text600, styles.sectionHeader]}>
        Следующие напоминания
      </Text>
      {renderBlocks(afterHeaderBlocks)}
    </ScreenContainer>
  );
}

export default Reminder;
