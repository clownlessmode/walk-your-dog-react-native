import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props extends TouchableOpacityProps {
  title: string;
}
function RemindersBlock({ title, ...props }: Props) {
  let img;

  switch (title) {
    case 'Записаться на услугу':
      img = require('@assets/reminders/signService.png');
      break;
    case 'Вакцинация':
      img = require('@assets/reminders/vaccination.png');
      break;
    case 'Прививки от клещей и глистов':
      img = require('@assets/reminders/inoculation.png');
      break;
    case 'Ветеринар':
      img = require('@assets/reminders/veterinarian.png');
      break;
    case 'Купание':
      img = require('@assets/reminders/swimming.png');
      break;
    case 'Груминг':
      img = require('@assets/reminders/grooming.png');
      break;
    case 'Чистка ушей':
      img = require('@assets/reminders/earCleaning.png');
      break;
    case 'Стрижка когтей':
      img = require('@assets/reminders/cutting.png');
      break;
  }
  return (
    <TouchableOpacity {...props} style={{ alignItems: 'center' }}>
      <Image source={img} style={styles.img} alt="aye" />
      <View style={styles.overlay}>
        <Text style={[globalStyles.text500, styles.textTitle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default RemindersBlock;
