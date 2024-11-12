import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text,  View, ViewProps } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import { formatDate } from '@widgets/date-event-block/DateEventBlock';
interface Props extends ViewProps {
  datetime: string;
  nameService: string;
  address: string
}
function EventBlock({datetime, nameService, address, ...props}: Props) {
  const formatAddress = (address: string) => {
    if (!address) return '';
    
    const withoutCity = address.split(',').slice(1).join(',').trim();
    
    const streetTypes = [
      'улица', 'ул.',
      'переулок', 'пер.',
      'проспект', 'просп.',
      'бульвар', 'б-р',
      'шоссе',
      'проезд'
    ];
    
    let result = withoutCity;
    streetTypes.forEach(type => {
      result = result.replace(new RegExp(type, 'gi'), '');
    });
    
    return result.replace(/\s+/g, ' ').trim();
  };
  

const { dayMonth, hoursMinutes } = formatDate(datetime);
  return (
    <View style={styles.wrapper} {...props}>
      <View style={styles.allInfo}>
        <Text style={[globalStyles.text500, {opacity: 0.5} ]}>
         {dayMonth}
        </Text>
        <Ionicons name="ellipse" size={4} color="grey" />
        <Text style={[globalStyles.text500, {opacity: 0.5} ]}>
        {hoursMinutes}
        </Text>
      </View>
      <Text style={[globalStyles.text500, {fontSize: 16} ]}>
        {nameService} | {formatAddress(address)} 
      </Text>
    </View>
  );
}

export default EventBlock;
