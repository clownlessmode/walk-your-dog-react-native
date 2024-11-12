import useUserStore from '@entity/users/user.store';
import { AntDesign } from '@expo/vector-icons';
import GoBack from '@features/go-back/GoBack';
import globalStyles from '@shared/constants/globalStyles';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Form from '@features/deposit/Form';

function Deposit() {
  const { user } = useUserStore();
  const balanceTextColor = user?.balance.general === 0 ? '#4c131a' : 'black';
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Пополнение</Header>
      <View style={{ gap: 20, paddingTop: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.balanceContainer}>
            <View style={styles.blockArrow}>
              <AntDesign name="arrowdown" size={20} color="white" />
            </View>
            <View style={styles.blockBalance}>
              <Text
                style={[globalStyles.text500, { fontSize: 12, opacity: 0.5 }]}
              >
                Внутренний счет
              </Text>
              <Text style={[globalStyles.text500, {color: balanceTextColor, fontSize: 16 }]}>
                {user?.balance.general} ₽
              </Text>
            </View>
          </View>
        </View>
        <Form />
      </View>
    </ScreenContainer>
  );
}

export default Deposit;
