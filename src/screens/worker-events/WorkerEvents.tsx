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
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventInfo from '@shared/ui/event-info/EventInfo';
import Waiting from '@screens/waiting/Waiting';
import { Location } from '@screens/map/map.store';
import WebView from 'react-native-webview';
import styles from './styles';
import useRoleStore from '@screens/auth/role.store';
import AllEvent from '@screens/all-event/AllEvent';

function WorkerEvents() {
  const { role } = useRoleStore();
  const [selectedTab, setSelectedTab] = useState('active');
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUserStore();
  const { workerService, isLoadingWorkerServices } = useServiceController(
    user?.id
  );
  console.log('workerservice', workerService);
  const [localWorkerService, setLocalWorkerService] = useState(
    workerService || []
  );
  const [isDataLoadedOnce, setIsDataLoadedOnce] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    if (workerService && workerService.length > 0) {
      setLocalWorkerService(workerService);
    }
  }, [workerService]);
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lon: number } | undefined
  >(undefined);

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
  const [isLocating, setIsLocating] = useState(false);
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
    localWorkerService
      ?.map((service) => {
        console.info('STATUS', service.status);
        const serviceDate = new Date(service.datetime);
        const isIncludedStatus = [
          'В работе',
          'Поиск исполнителя',
          'В ожидании',
        ].includes(service.status);

        // Check if the service is within the display range (from two hours ago to three hours from now)
        const isInTimeRange =
          serviceDate >= twoHoursAgo && serviceDate <= threeHoursFromNow;
        let timeDisplay = '';
        if (serviceDate > now && serviceDate <= threeHoursFromNow) {
          // Service is starting within the next three hours
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
          // Service has already started, calculate how long it has been in progress
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
        if (filteredServices[newIndex] && filteredServices[newIndex].address) {
          setCurrentIndex(newIndex);
          setEvent(filteredServices[newIndex].address);
        }
      }
    },
    [filteredServices]
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header style={{ paddingHorizontal: 15 }}>События</Header>
      <View style={styles.tabButton}>
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
          Все
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
                renderItem={({ item }) => (
                  <View style={styles.blockPeet}>
                    <EventInfo
                      worker={
                        role === 'CLIENT'
                          ? {
                              reviews: 0,
                              created_at: item.worker?.created_at || '',
                              id: item.worker?.id || '',
                              name: item.worker?.meta?.name || '',
                              img: item.worker?.meta?.image || '',
                            }
                          : undefined
                      }
                      client={
                        role === 'SITTER'
                          ? {
                              id: item.customer.id || '',
                              name: item.customer.meta.name || '',
                              img: item.customer.meta.image || '',
                              created_at: item.customer.meta.created_at || '',
                            }
                          : undefined
                      }
                      serviceId={item.id}
                      time={item.timeDisplay ? item.timeDisplay : item.datetime}
                      status={item.status}
                      address={item.address.address}
                      comment={item.comment}
                      role={'SITTER'}
                      additionalPet={item.pet.parameters.additional}
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
                )}
              />
            )}
          </View>
        </>
      )}
      {selectedTab === 'waiting' && (
        <View>
          <AllEvent />
        </View>
      )}
    </View>
  );
}

export default WorkerEvents;
