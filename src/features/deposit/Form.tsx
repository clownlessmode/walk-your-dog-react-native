import globalStyles from '@shared/constants/globalStyles';
import Input from '@shared/ui/input/Input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import styles from './styles';
import Button from '@shared/ui/button/Button';
import { useRefillController } from '@entity/refill/refill.controller';
import useUserStore from '@entity/users/user.store';
import { AbonementRo } from '@entity/abonements/modal/abonements.interface';
import { useAbonementsController } from '@entity/abonements/abonements.controller';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

interface BalanceDto {
  amount: number;
  prize?: string;
}

const summ = [
  { id: 1, price: 1000 },
  { id: 2, price: 3000 },
  { id: 3, price: 5000 },
  { id: 4, price: 10000 },
];

function Form() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { refill, loadingRefil } = useRefillController(user?.id);
  const { prizes } = useAbonementsController();
  const { control, handleSubmit, setValue, watch, formState } = useForm({
    defaultValues: {
      amount: 0,
      prize: undefined,
    },
  });

  const amount = watch('amount');

  if (Object.keys(formState.errors).length > 0) {
    Vibration.vibrate();
  }

  const handleSumPress = (amount: number) => {
    setValue('amount', amount);
  };

  const onSubmit = async (data: BalanceDto) => {
    const finalData: BalanceDto = { amount: data.amount };

    if (data.prize) {
      finalData.prize = data.prize;
    }

    const response = await refill(finalData);
    navigation.navigate('webViewPayment', { uri: response });
  };

  const handleSelectPrize = (prize: any) => {
    setValue('prize', prize.id);
  };

  const renderChatItem: ListRenderItem<AbonementRo> = ({ item }) => {
    const isSelected = watch('prize') === item.id;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('@assets/sobaka.png')}
          style={styles.blockPrize}
        >
          <Text
            style={[
              globalStyles.text600,
              { fontSize: 12, color: 'white', width: 165 },
            ]}
          >
            {item.abonementType.name} (Бесплатная услуга){' '}
            <Text style={[globalStyles.text700, { fontSize: 14 }]}>
              От 3000₽
            </Text>
          </Text>
          <TouchableOpacity
            style={[styles.button, amount < 3000 && { opacity: 0.5 }, isSelected && {opacity: 0.7}]}
            onPress={() => handleSelectPrize(item)}
            disabled={amount < 3000}
          >
            <Text style={[globalStyles.text600, { fontSize: 12 }]}>
              Выбрать
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };

  return (
    <>
      <View style={{ gap: 14 }}>
        <Controller
          control={control}
          name="amount"
          rules={{
            min: {
              value: 50,
              message: 'Сумма должна быть не менее 50 рублей',
            },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ gap: 2, width: '100%' }}>
              <Input
                keyboardType="number-pad"
                placeholder="Введите сумму перевода"
                value={value ? `${value}` : ''}
                onChangeText={(text) => {
                  const numericValue =
                    parseFloat(text.replace(/[₽\s]/g, '')) || 0;
                  onChange(numericValue);
                }}
                error={!!fieldState.error}
              />
              {fieldState.error && (
                <Text style={{ color: 'red', fontSize: 14 }}>
                  {fieldState.error.message}
                </Text>
              )}
            </View>
          )}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {summ.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleSumPress(item.price)}
              style={styles.ammount}
            >
              <Text style={[globalStyles.text500, { fontSize: 16 }]}>
                {item.price} ₽
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ gap: 16 }}>
        <Text style={[globalStyles.text500, { fontSize: 16 }]}>
          Выберите подарок
        </Text>
        <FlatList
          data={prizes}
          contentContainerStyle={{ gap: 10 }}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderChatItem}
        />
        <View style={styles.container}>
          <ImageBackground
            source={require('@assets/abonement.png')}
            style={styles.blockAbonement}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'column' }}>
                <Text style={[globalStyles.text600, styles.titleTextAbon]}>
                  С абонементом дешевле
                </Text>
                <Text style={[globalStyles.text600, styles.descripTextAbon]}>
                  50 прогулок по абонементу на 30% дешевле!
                </Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text style={[globalStyles.text600, styles.textPriceLine]}>
                  1200₽
                </Text>
                <Text style={[globalStyles.text600, styles.textPrice]}>
                  900₽
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <Button isLoading={loadingRefil} onPress={handleSubmit(onSubmit)}>
          Оплатить
        </Button>
      </View>
    </>
  );
}

export default Form;
