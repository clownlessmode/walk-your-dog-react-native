import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import { Alert, Platform, Share, Text, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import Button from '@shared/ui/button/Button';
import * as Sharing from 'expo-sharing';

function BonusProgram() {
  const { user } = useUserStore();
  const handleShare = async () => {
    try {
      const shareOptions = {
        message: `
Привет! 🐾 Я тут нашел крутое приложение для ухода за собаками — Walk Your Dog! Они занимаются выгулом, ситтингом и зоо-нянями для собак любых пород, а еще ухаживают за питомцами. 

У меня есть промокод 🎉 Вводи его при регистрации: ${user?.meta.promocode} 
Или заходи на сайт и бронируй!
https://walkyourdog.ru/
  
Они работают в Москве, Питере, Нижнем Новгороде, Екатеринбурге, Сочи и Калининграде. 😍

Попробуй, уверен, тебе понравится!
`,
        title: 'Walk your dog', // для некоторых платформ
      };

      const result = await Share.share(shareOptions, {
        dialogTitle: 'Поделиться с друзьями',
        subject: 'Поделиться приложением', // для email
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('shared with activity type');
        } else {
          // shared
          console.log('shared');
        }
      }
    } catch (error) {
      Alert.alert(
        'Ошибка',
        'Не удалось поделиться' +
          (error instanceof Error ? `: ${error.message}` : '')
      );
    }
  };

  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Бонусная программа</Header>
      <View style={{ gap: 16 }}>
        <View style={styles.container}>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>
            Ваш баланс: {user?.balance.promo} Б
          </Text>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>
            (1 Б = 1 ₽)
          </Text>
        </View>
        <View style={{ gap: 16 }}>
          <Text style={[globalStyles.text400, { fontSize: 16 }]}>
            1) Пригласите друга по своему промокоду и получите 1000₽ на свой
            бонусный счет
          </Text>
          <Text style={[globalStyles.text400, { fontSize: 16 }]}>
            2) Оплачивайте услуги со своего внутреннего счета и получайте 5%
            кэшбека в виде бонусов
          </Text>
        </View>
        <Button onPress={handleShare}>
          Ваш промокод {user?.meta.promocode}
        </Button>
      </View>
    </ScreenContainer>
  );
}

export default BonusProgram;
