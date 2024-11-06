import useUserStore from '@entity/users/user.store';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
interface Props {
  balanceType: 'general' | 'promo';
  selectedBalance: (type: 'general' | 'promo') => void
}
function Balances({balanceType, selectedBalance}: Props) {
  const { user } = useUserStore();
  return (
    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <TouchableOpacity onPress={() => selectedBalance('general')} style={[
            styles.balanceContainer,
            balanceType === 'general' ? styles.selected : styles.unselected,
          ]}>
          <Text  style={[
            styles.balanceText,
            balanceType === 'general' ? styles.selectedText : styles.unselectedText,
          ]}>{user?.balance.general} ₽</Text>
          <Text style={[
            styles.labelText,
            balanceType === 'general' ? styles.selectedText : styles.unselectedText,
          ]}>Баланс счета</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectedBalance('promo')} style={[
            styles.balanceContainer,
            balanceType === 'promo' ? styles.selected : styles.unselected,
          ]}>
          <Text style={[
            styles.balanceText,
            balanceType === 'promo' ? styles.selectedText : styles.unselectedText,
          ]}>{user?.balance.promo} Б</Text>
          <Text style={[
            styles.labelText,
            balanceType === 'promo' ? styles.selectedText : styles.unselectedText,
          ]}>Бонусный счет</Text>
        </TouchableOpacity>
    </View>
  );
}

export default Balances;