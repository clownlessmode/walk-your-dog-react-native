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
  // console.log(workerService)
  const [localWorkerService, setLocalWorkerService] = useState(workerService || []);
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
        const serviceDate = new Date(service.datetime);
        const isIncludedStatus = [
          'В работе',
          'Ожидание отчета',
          'Поиск исполнителя',
          'В ожидании'
        ].includes(service.status);

        // Check if the service is within the display range (from two hours ago to three hours from now)
        const isInTimeRange =
          serviceDate >= twoHoursAgo && serviceDate <= threeHoursFromNow;
          console.log(`Сервис: ${service.id}, Дата: ${serviceDate}, Время: ${service.datetime}`);
          console.log(`Включен статус: ${isIncludedStatus}, Временной диапазон: ${isInTimeRange}`);
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
          console.log('Current Address:', filteredServices[newIndex].address);
        } else {
          console.warn(`Address is missing for item at index ${newIndex}`);
          console.log(
            'Filtered Service at this index:',
            filteredServices[newIndex]
          );
        }
      }
    },
    [filteredServices]
  );
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  if (isLoadingWorkerServices || localWorkerService === undefined || localWorkerService.length === 0) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      </ScreenContainer>
    );
  }
  // if (localWorkerService.length === 0) {
  //   return (
  //     <ScreenContainer>
  //       <View
  //         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //       >
  //         <Text style={[globalStyles.text500, { fontSize: 18 }]}>
  //           Активные события отсутствуют
  //         </Text>
  //       </View>
  //     </ScreenContainer>
  //   );
  // }
  if (!filteredServices) {
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
      <Header style={{ paddingHorizontal: 15 }}>События</Header>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 100,
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
              <ScrollView>
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
                        item.worker
                          ? {
                              reviews: 0,
                              created_at: item.worker.created_at,
                              id: item.worker.id,
                              name: item.worker.meta.name,
                              img:
                                item.worker.meta.image ||
                                'https://default-image-url.png', // Default image if none provided
                            }
                          : undefined
                      }
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
              </ScrollView>
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
