import { RouteProp, useRoute } from '@react-navigation/native';
import { Screens } from '@shared/types/screens.type';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import MapEvent from '@shared/ui/map-event/MapEvent';
import React, { useEffect, useState } from 'react';
import * as MyLocation from 'expo-location';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EventInfo from '@shared/ui/event-info/EventInfo';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './styles';
import GoBack from '@features/go-back/GoBack';
import EventDetailsItem from '@widgets/event-details-info/EventDetailsInfo';

type EventDetailsProp = RouteProp<Screens, 'eventDetails'>;

function EventDetails() {
  const insets = useSafeAreaInsets();
  const route = useRoute<EventDetailsProp>();
  const { event } = route.params;
  const [initialLocation, setInitialLocation] = useState<
    { lat: number; lon: number } | undefined
  >(undefined);

  useEffect(() => {
    const getLocation = async () => {
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

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Нет данных';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMMM HH:mm', { locale: ru });
  };

  // Проверяем наличие данных перед рендерингом компонента
  if (!event) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Данные события отсутствуют</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <View style={{ paddingHorizontal: 15 }}>
        <Header before={<GoBack />}>Событие</Header>
      </View>
      <MapEvent
        apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
        initialLocation={{
          lat: event?.address?.lat || initialLocation?.lat || 0,
          lon: event?.address?.lon || initialLocation?.lon || 0,
        }}
        markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
      />
      <View style={styles.blockPeet}>
        <EventDetailsItem
        serviceId={event?.id}
          time={formatDate(event.datetime)}
          status={event.status || 'Неизвестно'}
          address={event.address?.address || 'Адрес не указан'}
          comment={event.comment || 'Комментарий отсутствует'}
          pet={event.pet?.name || 'Нет данных'}
          pettype={event.pet?.breed?.petType?.type || 'Неизвестно'}
          price={event.price || 0}
          service={event.mainService?.name || 'Услуга не указана'}
          img={event.customer.meta.image}
          nameClient={event.customer.meta.name || 'Имя не указано'}
          phoneClient={event.customer.meta.telephone || 'Номер телефона не указан'}
          additionalPet={event.pet.parameters.health || 'Номер телефона не указан'}
          petAll={event.pet}
        />
      </View>
    </View>
  );
}

export default EventDetails;
