import useUserStore from '@entity/users/user.store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useMapStore from '@screens/map/map.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

function Home() {
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const { map } = useMapStore();
  const formatMapText = (mapText: string | undefined) => {
    if (!mapText) return ''; // Если map не определен, вернуть пустую строку

    // Разделяем строку по запятой
    const parts = mapText.split(',');

    // Если есть хотя бы одна запятая, берем текст после первой запятой
    const remainingText = parts.length > 1 ? parts.slice(1).join(',').trim() : mapText;

    // Обрезаем текст до 10 символов и добавляем "..." если больше 10 символов
    return remainingText.length > 10 ? `${remainingText.slice(0, 20)}...` : remainingText;
  };
  return (
    <ScreenContainer style={{ paddingHorizontal: 0 }}>
      <Header
      style={{paddingHorizontal: 15}}
        before={
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
          >
            <MaterialCommunityIcons
              name="map-marker"
              size={29}
              color="#000"
              onPress={() => navigation.navigate('map')}
            />
            <Text style={globalStyles.text500}>{formatMapText(map !== null ? map : undefined)}</Text>
          </TouchableOpacity>
        }
        after={
          <MaterialCommunityIcons name="bell-outline" size={29} color="#000" />
        }
      >
        <></>
      </Header>
      <View style={styles.container}>
        <View style={styles.fullWidthBackground}>
          <View style={styles.paddedContent}>
            <View style={styles.balance}>
              <Text style={globalStyles.text500}>
                Ваш баланс: {user?.balance.general} ₽
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.paddedContent}></View>
      </View>
    </ScreenContainer>
  );
}
export default Home;
