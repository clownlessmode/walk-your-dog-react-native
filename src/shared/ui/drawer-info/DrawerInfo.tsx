import React from 'react';
import { Text, View } from 'react-native';
import Button from '../button/Button';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';

function DrawerInfo() {
  return (
    <View style={styles.wrapper}>
      <Text style={[globalStyles.text600, { fontSize: 18 }]}>
        Выгул для собак
      </Text>
      <View>
        <Text
          style={[globalStyles.text500, {textAlign: 'center', fontSize: 16}]}
        >
          Во время часовой прогулки питомец пройдет примерно 10 километров по
          самым разнообразным дорогам и при необходимости получит тренировку от
          профессионального кинолога
        </Text>
      </View>
      <View style={{ gap: 15, width: '100%' }}>
        <View style={styles.wrapperPrice}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>
            Длительность
          </Text>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>60 минут</Text>
        </View>
        <View style={styles.wrapperPrice}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>
            Помыть лапы после прогулки
          </Text>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>+450 ₽ </Text>
        </View>
        <View style={styles.wrapperPrice}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>
            Покормить после прогулки
          </Text>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>+150 ₽ </Text>
        </View>
        <View style={styles.wrapperPrice}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>
            Дрессировка
          </Text>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>+150 ₽ </Text>
        </View>
        <View style={styles.wrapperPrice}>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>Грумминг</Text>
          <Text style={[globalStyles.text500, {fontSize: 16}]}>+1250 ₽ </Text>
        </View>
      </View>
    </View>
  );
}

export default DrawerInfo;
