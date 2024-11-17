import globalStyles from '@shared/constants/globalStyles';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Pet } from '@entity/pets/model/pet.interface';
import {
  ServiceCreateRo,
  Status,
} from '@entity/service/model/service.interface';
import { Ionicons } from '@expo/vector-icons';
import StatusText from '../status/Status';

interface Props {
  pet: Pet;
  service: ServiceCreateRo;
  time: string;
  formattedDate?: string;
}
function ServiceInfo({ pet, service, time, formattedDate }: Props) {

  const truncateString = (str: any, num: any) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text
              style={[globalStyles.text500, { fontSize: 12, opacity: 0.5 }]}
            >
              {formattedDate}
            </Text>
            <Ionicons
              name="ellipse"
              size={4}
              color="black"
              style={{ opacity: 0.5 }}
            />
            <Text
              style={[globalStyles.text500, { fontSize: 12, opacity: 0.5 }]}
            >
              {time}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Text style={[globalStyles.text500, styles.title]}>{truncateString(`${pet.name}`, 7)}</Text>
            <Text style={[globalStyles.text600, styles.slash]}>|</Text>
            <Text style={[globalStyles.text500, styles.title]}>
              {service.mainService.name}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <StatusText status={service.status}/>
      </View>
    </View>
  );
}

export default ServiceInfo;
