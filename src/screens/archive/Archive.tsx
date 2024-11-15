import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import { ServiceCreateRo } from '@entity/service/model/service.interface';
import ServiceInfo from '@shared/ui/service-info/ServiceInfo';
import Drawer from '@shared/ui/drawer/Drawer';
import DrawerInfoEvent from '@shared/ui/drawer-info-event/DrawerInfoEvent';
import Button from '@shared/ui/button/Button';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import { useChatsController } from '@entity/chats/chats.controller';
interface GroupedService {
  year: number;
  month: string;
  days: {
    day: string;
    payments: ServiceCreateRo[];
  }[];
}
function Archive() {
  const navigation = useAppNavigation()
  const { user } = useUserStore();
  const { chats, isLoading } = useChatsController(user?.id);
  const { getMyServices, loadingMyServices } = useServiceController(user?.id);
  console.log("NE STORE",getMyServices)
  const [localMyService, setLocalMyService] = useState(
    getMyServices || []
  );
  useEffect(() => {
    if (getMyServices && getMyServices.length > 0) {
      setLocalMyService(getMyServices);
    }
  }, [getMyServices]);
  console.log("STORE",localMyService)
  if (loadingMyServices) {
    return (
      <ScreenContainer>
        <Header before={<GoBack />}>Архив событий</Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#9D9D9D" />
        </View>
      </ScreenContainer>
    );
  }
  if (!localMyService) {
    return (
      <ScreenContainer>
        <Header before={<GoBack />}>Архив событий</Header>
        <View style={styles.loadingContainer}>
          <Text style={[globalStyles.text500, { fontSize: 18 }]}>
            Архив пуст
          </Text>
        </View>
      </ScreenContainer>
    );
  }
  const groupPaymentsByDate = (
    service: ServiceCreateRo[]
  ): GroupedService[] => {
    const groupedPayments: { [key: string]: GroupedService } = {};
    const now = new Date(); // Текущая дата и время

    service
      .filter((service) => new Date(service.datetime) <= now) // Оставляем только прошедшие события
      .forEach((service) => {
        const date = new Date(service.created_at);
        const year = date.getFullYear();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        const day = date.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
        });

        const key = `${year}-${month}`;

        if (!groupedPayments[key]) {
          groupedPayments[key] = { year, month, days: [] };
        }

        let dayGroup = groupedPayments[key].days.find((d) => d.day === day);
        if (!dayGroup) {
          dayGroup = { day, payments: [] };
          groupedPayments[key].days.push(dayGroup);
        }

        dayGroup.payments.push(service);
      });

    return Object.values(groupedPayments);
  };

  const handleSupportChat = () => {
    if (!chats || chats.length === 0) {
      console.error('Нет доступных чатов');
      return;
    }
  
    const supportChat = chats[0]; // Предполагаем, что чат с поддержкой всегда первый
    if (!supportChat) {
      console.error('Чат с поддержкой не найден');
      return;
    }
  
    navigation.navigate('userChat', {
      id: supportChat.id,
      name: supportChat.user2.meta.name,
      image: supportChat.user2.meta.image,
    });
  };

  const groupedData = groupPaymentsByDate(localMyService);
  if (localMyService.length === 0) {
    return (
      <ScreenContainer>
        <Header before={<GoBack />}>Архив событий</Header>
        <View style={styles.loadingContainer}>
          <Text style={[globalStyles.text500, { fontSize: 18 }]}>
            Архив пуст
          </Text>
        </View>
      </ScreenContainer>
    );
  }
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Архив событий</Header>
      <FlatList
        data={groupedData}
        keyExtractor={(item) => `${item.year}-${item.month}`}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={[globalStyles.text500, styles.year]}>{item.year}</Text>
            <Text style={[globalStyles.text600, styles.month]}>
              {item.month}
            </Text>

            {item.days.map((dayItem) => (
              <View
                key={`${item.year}-${item.month}-${dayItem.day}`}
                style={styles.daySection}
              >
                {dayItem.payments.map((service: ServiceCreateRo) => {
                  const date = new Date(service.datetime);
                  const time = date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  });
                  const formattedDate = date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: 'long',
                  });
                  const formattedDateDraw = date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  });
                  return (
                    <Drawer
                    close={<Button onPress={handleSupportChat}>Связаться с поддержкой</Button>}
                      trigger={
                        <ServiceInfo
                          pet={service.pet}
                          time={time}
                          formattedDate={formattedDate}
                          service={service}
                        />
                      }
                    >
                      <DrawerInfoEvent
                      key={service.id}
                        address={service.address}
                        nameService={service.mainService.name}
                        pet={service.pet}
                        worker={service.worker ?? undefined}
                        datetime={service.datetime}
                      />
                    </Drawer>
                  );
                })}
              </View>
            ))}
          </View>
        )}
      />
    </ScreenContainer>
  );
}

export default Archive;
