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

interface Props {
  pet: Pet;
  service: ServiceCreateRo;
  time: string;
  formattedDate?: string;
}
function ServiceInfo({ pet, service, time, formattedDate }: Props) {
  let styleStatus;
  switch (service.status) {
    case Status.DONE:
      styleStatus = styles.done;
      break;
    case Status.IN_PROGRESS:
      styleStatus = styles.inProgress;
      break;
    case Status.CANCELLED:
      styleStatus = styles.cancelled;
      break;
    case Status.REPORT:
      styleStatus = styles.report;
      break;
    default:
      styleStatus = styles.default;
  }

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
            <Text style={[globalStyles.text500, styles.title]}>{pet.name}</Text>
            <Text style={[globalStyles.text600, styles.slash]}>|</Text>
            <Text style={[globalStyles.text500, styles.title]}>
              {service.mainService.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={[{ justifyContent: 'center'}, styles.status, styleStatus]}>
        <Text style={[globalStyles.text500, {color: 'white'}]}>
          {service.status}
        </Text>
      </View>
    </View>
  );
}

export default ServiceInfo;
