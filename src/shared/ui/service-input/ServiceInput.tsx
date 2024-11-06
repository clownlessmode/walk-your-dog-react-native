import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  title?: string;
  description: string | undefined;
}
function ServiceInput({ title, description }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={[globalStyles.text400, { opacity: 0.5 }]}>{title}</Text>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>
          {description}
        </Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="chevron-right"
          color={'#545454'}
          size={16}
        />
      </View>
    </View>
  );
}

export default ServiceInput;
