import globalStyles from '@shared/constants/globalStyles';
import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
interface Props {
    type: string;
    time: string;
    total: number;
}
function PaymentsInfo({type, time, total}: Props) {
    let title = type === 'deposit' ? "Пополнение" : "Списание"
    let price = type === 'deposit' ? `+${total}` : `-${total}`
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={[globalStyles.text500, styles.title]}>{title}</Text>
        <Text style={[globalStyles.text600, styles.slash]}>|</Text>
        <Text style={[globalStyles.text500, styles.title]}>{time}</Text>
      </View>
      <Text
        style={[
          globalStyles.text500,
          { fontSize: 16 },
          type === 'deposit' ? { color: '#76D219' } : { color: '#000000' },
        ]}
      >
        {price} ₽
      </Text>
    </View>
  );
}

export default PaymentsInfo