import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import { Ionicons } from '@expo/vector-icons';
import Map from '@screens/map/Map';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Drawer from '@shared/ui/drawer/Drawer';
import Header from '@shared/ui/header/Header';
import MapEvent from '@shared/ui/map-event/MapEvent';

import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getAddressWord from '@shared/utils/addressWord';
import formatMapText from '@shared/utils/formatMapText';
import UserProfile from '@entity/users/ui/user-profile/UserProfile';
import normalizeData from '@shared/utils/normalizeDate';
import EventInfo from '@shared/ui/event-info/EventInfo';
import Waiting from '@screens/waiting/Waiting';
import { Location } from '@screens/map/map.store';
import useTime from '@shared/hooks/useTime';
import styles from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Screens } from '@shared/types/screens.type';
import GoBack from '@features/go-back/GoBack';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
type EventWaitingProp = RouteProp<Screens, 'eventWaiting'>;
const EventWaiting = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<EventWaitingProp>();
  const { event } = route.params;
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return 'Нет данных';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'd MMMM HH:mm', { locale: ru });
  };
  return (
    <View
      style={{
        position: 'relative',
        paddingTop: insets.top,
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <Header style={{ paddingHorizontal: 15 }} before={<GoBack />}>
        События
      </Header>

      <>
        <MapEvent
          apiKey="4ae2e824-85eb-482c-9eab-88f665a7d668"
          initialLocation={{
            lat: event.address ? event.address.lat : 0,
            lon: event.address ? event.address.lon : 0,
          }}
          markerIcon="https://i.ibb.co/Mfj99Lx/Pin-fill.png"
        />
        <View style={styles.blockPeet}>
          <EventInfo
            worker={
              event.worker
                ? {
                    reviews: 0,
                    created_at: event.worker.created_at,
                    id: event.worker.id,
                    name: event.worker.meta.name,
                    img:
                      event.worker.meta.image ||
                      'https://default-image-url.png',
                  }
                : undefined
            }
            time={formatDate(event.datetime)}
            status={event.status}
            address={event.address.address}
            comment={event.comment}
            pet={event.pet.name}
            pettype={
              event.pet.breed?.petType.type ? event.pet.breed?.petType.type : ''
            }
            price={event.price}
            service={event.mainService.name}
          />
        </View>
      </>
    </View>
  );
};

export default EventWaiting;
