import { AntDesign, Entypo } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import globalStyles from '@shared/constants/globalStyles';
import { Screens } from '@shared/types/screens.type';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../button/Button';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '../containers/ScreenContainer';
interface Props {
  variant: 'success' | 'error';
}
type VariantProp = RouteProp<Screens, 'payment'>;
function Payment() {
  const navigation = useAppNavigation();
  const route = useRoute<VariantProp>(); // Получаем параметры навигации
  const { variant } = route.params;
  return (
    <ScreenContainer
      style={{ justifyContent: 'space-between', alignItems: 'center', flex: 1 }}
    >
      <View style={{ opacity: 0 }}>
        <Text>123</Text>
      </View>
      {variant === 'success' ? (
        <View style={{ alignItems: 'center', gap: 20 }}>
          <AntDesign name="checkcircle" size={50} color="#56C300" />
          <View style={{ alignItems: 'center' }}>
            <Text
              style={[
                globalStyles.text500,
                { fontSize: 20, textAlign: 'center' },
              ]}
            >
              Счет успешно пополнен
            </Text>
            <Text style={[globalStyles.text400, { textAlign: 'center' }]}>
              Средства поступят на счет в течении 5 минут
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ alignItems: 'center', gap: 20 }}>
          <Entypo name="circle-with-cross" size={50} color="#FF0000" />
          <Text style={[globalStyles.text500, { fontSize: 20 }]}>Ошибка</Text>
        </View>
      )}

      <Button onPress={() => navigation.navigate('appStack')}>
        На главную
      </Button>
    </ScreenContainer>
  );
}

export default Payment;
