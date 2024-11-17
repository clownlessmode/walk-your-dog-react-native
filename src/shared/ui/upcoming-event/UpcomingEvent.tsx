import { formatDate } from 'date-fns';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props {
  img?: string;
  petName: string;
  nameService: string;
  datetime: string;
}
function UpcomingEvent({ img, petName, nameService, datetime }: Props) {
  const truncateString = (str: any, num: any) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Завтра в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  return (
    <View style={styles.event}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Image
          source={img ? { uri: img } : require('@assets/signUp/avatarPet.png')}
          style={{ width: 40, height: 40, borderRadius: 9999 }}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text
            style={[globalStyles.text500, { fontSize: 15, color: '#00000085' }]}
          >
            {truncateString(`${petName}`, 9)}
          </Text>
          <Text style={[globalStyles.text500]}>
            {truncateString(`${nameService}`, 13)}
          </Text>
        </View>
      </View>
      <Text style={[globalStyles.text500]}>{formatEventDate(datetime)}</Text>
    </View>
  );
}

export default UpcomingEvent;
