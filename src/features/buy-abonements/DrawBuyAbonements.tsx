import { useAbonementsController } from '@entity/abonements/abonements.controller';
import { AbonementBuyDto } from '@entity/abonements/modal/abonements.interface';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import useUserStore from '@entity/users/user.store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useBuyAbonementsStore from '@screens/buy-abonements/buyAbonements.store';
import globalStyles from '@shared/constants/globalStyles';
import Balances from '@shared/ui/balances/Balances';
import Button from '@shared/ui/button/Button';
import Ticket from '@shared/ui/ticket/Ticket';
import { abonementWorlds } from '@shared/utils/abonementWorlds';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import ConditionsApp from '@features/conditions-app/ConditionsApp';
import Toast from 'react-native-toast-message';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
interface Props {
  id: string;
  count: number;
  total: number;
  title: string;
  price: number;
}
function DrawBuyAbonements({ id, count, total, title, price }: Props) {
  const navigation = useAppNavigation()
  const [balanceType, setBalanceType] = useState<'general' | 'promo'>(
    'general'
  );
  const { user } = useUserStore();
  const { buyAbonements } = useBuyAbonementsStore();
  const { postAbonements } = useAbonementsController();
  const handlePurchase = async () => {
    if (!user) return;
    const userBalance =
      balanceType === 'general' ? user.balance.general : user.balance.promo;
     
    if (userBalance < price) {
      Toast.show({
        type: 'error',
        text1: 'Недостаточно средств',
        text2: `У вас недостаточно средств на ${balanceType === 'general' ? 'балансе' : 'бонусном счете'} для оплаты.`,
      });
      return;
    }
    const purchaseData: AbonementBuyDto = {
      userId: user.id,
      abonementId: id,
      balanceType: balanceType,
    };
    const response = await postAbonements(purchaseData);
    if (response) {
      navigation.navigate('abonements')
      Toast.show({
        type: 'success',
        text1: 'Успешно',
        text2: 'Абонемент приобретен!',
      });
    }

  };
  return (
    <View style={styles.wrapper}>
      <View style={{ gap: 10 }}>
        <Text style={[globalStyles.text600, styles.titleText]}>
          Покупка абонемента
        </Text>
        <UserProfile
          name={user ? user?.meta.name : ''}
          description={user ? user?.meta.email : ''}
          image={user?.meta.image}
          additional={
            <MaterialCommunityIcons
              name="chevron-right"
              color={'#545454'}
              size={16}
            />
          }
        />
        <Ticket
          count={total}
          total={total}
          title={abonementWorlds(title, total)}
        />
        <Balances balanceType={balanceType} selectedBalance={setBalanceType} />
      </View>
      <View style={{ gap: 30 }}>
        <View style={{ gap: 6 }}>
          <View style={styles.price}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Общая стоимость {price} ₽
            </Text>
          </View>
          <ConditionsApp />
        </View>
        <Button onPress={handlePurchase}>Оплатить</Button>
      </View>
    </View>
  );
}

export default DrawBuyAbonements;
