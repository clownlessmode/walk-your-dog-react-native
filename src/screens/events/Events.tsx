import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import MapEvent from '@shared/ui/map-event/MapEvent';
import TabButton from '@shared/ui/tab-button/TabButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as MyLocation from 'expo-location';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import EventInfo from '@shared/ui/event-info/EventInfo';
import Waiting from '@screens/waiting/Waiting';
import { Location } from '@screens/map/map.store';
import WebView from 'react-native-webview';
import { ServiceCreateRo } from '@entity/service/model/service.interface';

function Events() {
  const [selectedTab, setSelectedTab] = useState('active');
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUserStore();
  const { getMyServices, loadingMyServices } = useServiceController(user?.id);

  const [events, setEvents] = useState<ServiceCreateRo[]>([]);
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lon: number } | undefined
  >(undefined);
  useEffect(() => {
    if (getMyServices && getMyServices.length > 0) {
      setEvents(getMyServices);
    }
  }, [getMyServices]);
  const [timeoutReached, setTimeoutReached] = useState(false); // Контроль времени ожидания
  const [isDataLoadedOnce, setIsDataLoadedOnce] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 25000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (getMyServices && getMyServices.length > 0) {
      setIsDataLoadedOnce(true);
      setTimeoutReached(false);
    }
  }, [getMyServices]);

  const [isLocating, setIsLocating] = useState(false);
  useEffect(() => {
    const getLocation = async () => {
      // Запрос разрешения на доступ к местоположению
      const { status } = await MyLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await MyLocation.getCurrentPositionAsync({});
      setInitialLocation({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    };

    getLocation();
  }, []);

  const yaMapRef = useRef<WebView>(null);
  const getUserLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await MyLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsLocating(false);
        return;
      }

      const location = await MyLocation.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      // Устанавливаем начальное положение и центрируем карту на текущем местоположении
      setInitialLocation({ lat, lon });
      yaMapRef.current?.injectJavaScript(`setMapCenter(${lat}, ${lon});`);
    } catch (error) {
      console.error('Ошибка при запросе геопозиции:', error);
    } finally {
      setIsLocating(false); // Скрываем лоадер после завершения запроса
    }
  };
  // if (getMyServices)
  // console.log('All service statuses:', getMyServices.map(service => service.status));
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

  const filteredServices =
    events
      ?.map((service) => {
        const serviceDate = new Date(service.datetime);
        const isIncludedStatus = [
          'В работе',
          'Поиск исполнителя',
        ].includes(service.status);

        const isInTimeRange =
          serviceDate >= twoHoursAgo && serviceDate <= threeHoursFromNow;
        let timeDisplay = '';
        if (serviceDate > now && serviceDate <= threeHoursFromNow) {
          const remainingTime = Math.max(
            0,
            serviceDate.getTime() - now.getTime()
          );
          const hours = Math.floor(remainingTime / (1000 * 60 * 60));
          const minutes = Math.floor(
            (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          timeDisplay = `До начала ${hours} ч ${minutes} м`;
        } else if (serviceDate <= now) {
          const elapsedTime = now.getTime() - serviceDate.getTime();
          const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
          const minutes = Math.floor(
            (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          timeDisplay = `В работе ${hours} ч ${minutes} м`;
        }

        return {
          ...service,
          isIncludedStatus,
          isInTimeRange,
          timeDisplay,
        };
      })
      .filter((service) => service.isIncludedStatus && service.isInTimeRange) ||
    [];

  const [event, setEvent] = useState<Location | null>(null);
  const onViewRef = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        setCurrentIndex(newIndex);
        if (filteredServices[newIndex] && filteredServices[newIndex].address) {
          setEvent(filteredServices[newIndex].address);
        }
      }
    },
    [filteredServices]
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  if ((loadingMyServices || !timeoutReached) && !isDataLoadedOnce) {
    return (
      <ScreenContainer>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      </ScreenContainer>
    );
  }
  if (!events || events.length === 0) {
    return (
      <ScreenContainer>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={[globalStyles.text500, { fontSize: 18 }]}>
            Архив пуст
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  // console.log(event)
  return (
    <View
      style={[
        {
          position: 'relative',
          paddingTop: insets.top,
          backgroundColor: 'white',
          flex: 1,
        },
      ]}
    >
      <Header
        style={{ paddingHorizontal: 15 }}
        before={
          <TouchableOpacity style={{ opacity: 0 }}>
            <Text style={{ fontSize: 16 }}>События</Text>
          </TouchableOpacity>
        }
        after={
          <TouchableOpacity onPress={() => navigation.navigate('archive')}>
            <Text style={[globalStyles.text500, { fontSize: 16 }]}>
              Архив
            </Text>
          </TouchableOpacity>
        }
      >
        События
      </Header>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 90,
          right: '28%',
          gap: 10,
          zIndex: 99999,
          width: '100%',
          maxWidth: 170,
        }}
      >
        <TabButton
          onPress={() => setSelectedTab('active')}
          variant={selectedTab === 'active' ? 'dark' : 'light'}
        >
          Активные
        </TabButton>
        <TabButton
          onPress={() => setSelectedTab('waiting')}
          variant={selectedTab === 'waiting' ? 'dark' : 'light'}
        >
          Ожидают
        </TabButton>
      </View>

      {selectedTab === 'active' && (
        <>
          <MapEvent
            apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
            initialLocation={{
              lat: event?.lat || initialLocation?.lat || 0,
              lon: event?.lon || initialLocation?.lon || 0,
            }}
            markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
          />
          <View style={styles.wrapper}>
            <View style={styles.pagination}>
              {filteredServices.slice(0, 6).map((_, index) => (
                <Ionicons
                  key={index}
                  name="ellipse"
                  size={8}
                  color={index === currentIndex ? 'black' : 'grey'}
                />
              ))}
            </View>
            {filteredServices.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[globalStyles.text500, { fontSize: 18 }]}>
                  Активные события отсутствуют
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredServices}
                horizontal
                onViewableItemsChanged={onViewRef}
                viewabilityConfig={viewConfigRef.current}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  console.log('workeeeeerRev', item.worker)
                  
                  return (
                  <View style={styles.blockPeet}>
                    <EventInfo
                      worker={
                        item.worker
                          ? {
                              reviews: 0,
                              meta: item.worker.worker.id,
                              created_at: item.worker.created_at,
                              id: item.worker.id,
                              name: item.worker.meta.name,
                              img:
                                item.worker.meta.image ||
                                'https://default-image-url.png',
                            }
                          : undefined
                      }
                      time={item.timeDisplay ? item.timeDisplay : item.datetime}
                      status={item.status}
                      address={item.address.address}
                      comment={item.comment}
                      pet={item.pet.name}
                      pettype={
                        item.pet.breed?.petType.type
                          ? item.pet.breed?.petType.type
                          : ''
                      }
                      price={item.price}
                      service={item.mainService.name}
                    />
                  </View>
                )}}
              />
            )}
          </View>
        </>
      )}
      {getMyServices && selectedTab === 'waiting' && (
        <View>
          <Waiting />
        </View>
      )}
    </View>
  );
}

export default Events;
