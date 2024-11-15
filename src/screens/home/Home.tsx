import useUserStore from '@entity/users/user.store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useMapStore from '@screens/map/map.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import { useUserController } from '@entity/users/user.controller';
import formatMapText from '@shared/utils/formatMapText';
import getMeOnFocus from '@shared/utils/getMeOnFocus';
import UpcomingEvents from '@widgets/upcoming-events/UpcomingEvents';
import Stories from '@shared/ui/stories/Stories';
import StoryViewer from '@widgets/stories/StoriesViewer';
import Button from '@shared/ui/button/Button';

function Home() {
  getMeOnFocus();
  const navigation = useAppNavigation();
  const { user } = useUserStore();
  const balanceTextColor = user?.balance.general === 0 ? '#4c131a' : 'black';
  return (
    <ScreenContainer style={{ paddingHorizontal: 0 }}>
      <Header
        style={{ paddingHorizontal: 15 }}
        before={
          <TouchableOpacity
            onPress={() => navigation.navigate('map')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
          >
            <MaterialCommunityIcons name="map-marker" size={29} color="#000" />
            <Text style={globalStyles.text500}>
              {user?.meta.addresses[0]
                ? formatMapText(
                    user?.meta.addresses[user?.meta.addresses.length - 1]
                      .address !== null
                      ? user?.meta.addresses[user?.meta.addresses.length - 1]
                          .address
                      : undefined
                  )
                : 'Добавьте адрес'}
            </Text>
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
              <TouchableOpacity onPress={() => navigation.navigate('deposit')}>
                <Text
                  style={[globalStyles.text500, { color: balanceTextColor }]}
                >
                  Ваш баланс: {user?.balance.general} ₽
                </Text>
              </TouchableOpacity>
            </View>
            <UpcomingEvents />
          </View>
        </View>
        <View style={styles.paddedContent}></View>
        <View
          style={{
            paddingHorizontal: 15,
            overflow: 'hidden',
            borderRadius: 16,
            marginBottom: 10,
          }}
        >
          <ImageBackground
            source={require('@assets/vigul.png')}
            style={{ borderRadius: 16, padding: 10 }}
          >
            <Text
              style={[
                globalStyles.text600,
                { fontSize: 16, color: 'white', textAlign: 'center' },
              ]}
            >
              Выгода до 40% на выгул и дрессировку
            </Text>
            <Text
              style={[
                globalStyles.text500,
                { fontSize: 12, color: 'white', textAlign: 'center' },
              ]}
            >
              Чтобы пользоваться нашими услугами было еще выгоднее — попробуйте
              абонементы в личном кабинете.{' '}
            </Text>
          </ImageBackground>
        </View>
        <StoryViewer />
      </View>
    </ScreenContainer>
  );
}
export default Home;
