import { ServiceCreateRo } from '@entity/service/model/service.interface';
import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import AddRecord from '@screens/add-record/AddRecord';
import Button from '@shared/ui/button/Button';
import Drawer from '@shared/ui/drawer/Drawer';
import UpcomingEvent from '@shared/ui/upcoming-event/UpcomingEvent';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';

function UpcomingEvents() {
  const { user } = useUserStore();
  const { getMyServices, loadingMyServices } = useServiceController(user?.id);
  const [modalVisible, setModalVisible] = useState(false);

  // Локальное состояние для хранения событий
  const [events, setEvents] = useState<ServiceCreateRo[]>([]);

  useEffect(() => {
    if (getMyServices && getMyServices.length > 0) {
      setEvents(getMyServices);
    }
  }, [getMyServices]);

  const renderEvents = () => {
    if (loadingMyServices) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      );
    }

    if (!events || events.length === 0) {
      return (
        <View style={styles.noEventsContainer}>
          <Text style={[globalStyles.text400, styles.noEventsText]}>
            Отсутствуют ближайшие события
          </Text>
        </View>
      );
    }

    return events.slice(0, 2).map((event, index) => (
      <UpcomingEvent
        key={index}
        datetime={event.datetime}
        nameService={event.mainService.name}
        petName={event.pet.name}
      />
    ));
  };

  return (
    <View>
      <View style={styles.events}>
        <Text style={styles.eventsTitle}>Ближайшие события</Text>
        <View style={styles.scrollEvent}>{renderEvents()}</View>

        <Drawer
          hasBackdrop={true}
          trigger={
            <View style={styles.addRecordButton}>
              <Text style={styles.addRecordButtonText}>Добавить запись</Text>
            </View>
          }
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <AddRecord setModalVisible={setModalVisible} />
        </Drawer>
      </View>
    </View>
  );
}


export default UpcomingEvents;
