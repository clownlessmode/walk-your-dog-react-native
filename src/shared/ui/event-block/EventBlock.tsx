import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
interface Props extends TouchableOpacityProps {}
function EventBlock({...props}: Props) {
  return (
    <TouchableOpacity style={styles.wrapper} {...props}>
      <View style={styles.allInfo}>
        <Text style={[globalStyles.text500, {opacity: 0.5} ]}>
          {/* {new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
          }).format(new Date(event.date))} */}
          date
        </Text>
        <Ionicons name="ellipse" size={4} color="grey" />
        <Text style={[globalStyles.text500, {opacity: 0.5} ]}>
          time
        </Text>
      </View>
      <Text style={[globalStyles.text500, {fontSize: 16, opacity: 0.5} ]}>
        {/* {event.serviceName} | {event.address} */} service | address
      </Text>
    </TouchableOpacity>
  );
}

export default EventBlock;
