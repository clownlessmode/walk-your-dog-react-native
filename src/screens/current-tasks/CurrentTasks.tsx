import { useServiceController } from '@entity/service/service.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import globalStyles from '@shared/constants/globalStyles';
import { ServiceCreateRo } from '@entity/service/model/service.interface';
import ServiceInfo from '@shared/ui/service-info/ServiceInfo';
import Drawer from '@shared/ui/drawer/Drawer';
import DrawerInfoEvent from '@shared/ui/drawer-info-event/DrawerInfoEvent';
import styles from './styles';
import Button from '@shared/ui/button/Button';
import { useChatsController } from '@entity/chats/chats.controller';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
interface GroupedService {
  year: number;
  month: string;
  days: {
    day: string;
    payments: ServiceCreateRo[];
  }[];
}
function CurrentTasks() {
  const navigation = useAppNavigation()
  const { user } = useUserStore();
  const { workerService, isLoadingWorkerServices } = useServiceController(
    user?.id
  );
  const [localWorkerService, setLocalWorkerService] = useState(
    workerService || []
  );
  useEffect(() => {
    if (workerService && workerService.length > 0) {
      setLocalWorkerService(workerService);
    }
  }, [workerService]);
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
          'Ожидание отчета',
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
  const formatDateTime = (datetime: string | Date) => {
    const date = new Date(datetime);

    // Формат времени (часы:минуты)
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-часовой формат
    });

    // Формат даты (день и месяц)
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
    });

    return { time, formattedDate };
  };
  // if (isLoadingWorkerServices) {
  //   return (
  //     <ScreenContainer>
  //       <Header before={<GoBack />}>Архив событий</Header>
  //       <View style={styles.loadingContainer}>
  //         <ActivityIndicator size="small" color="#9D9D9D" />
  //       </View>
  //     </ScreenContainer>
  //   );
  // }
  // if (!workerService) {
  //   return (
  //     <ScreenContainer>
  //       <Header before={<GoBack />}>Архив событий</Header>
  //       <View style={styles.loadingContainer}>
  //         <Text style={[globalStyles.text500, { fontSize: 18 }]}>
  //           Архив пуст
  //         </Text>
  //       </View>
  //     </ScreenContainer>
  //   );
  // }
  // const groupPaymentsByDate = (
  //   service: ServiceCreateRo[]
  // ): GroupedService[] => {
  //   const groupedPayments: { [key: string]: GroupedService } = {};
  //   const now = new Date(); // Текущая дата и время

  //   service
  //     .filter((service) => new Date(service.datetime) <= now) // Оставляем только прошедшие события
  //     .forEach((service) => {
  //       const date = new Date(service.created_at);
  //       const year = date.getFullYear();
  //       const month = date.toLocaleString('ru-RU', { month: 'long' });
  //       const day = date.toLocaleDateString('ru-RU', {
  //         day: 'numeric',
  //         month: 'long',
  //       });

  //       const key = `${year}-${month}`;

  //       if (!groupedPayments[key]) {
  //         groupedPayments[key] = { year, month, days: [] };
  //       }

  //       let dayGroup = groupedPayments[key].days.find((d) => d.day === day);
  //       if (!dayGroup) {
  //         dayGroup = { day, payments: [] };
  //         groupedPayments[key].days.push(dayGroup);
  //       }

  //       dayGroup.payments.push(service);
  //     });

  //   return Object.values(groupedPayments);
  // };
  // const groupedData = groupPaymentsByDate(workerService);
  // if (groupedData.length === 0) {
  //   return (
  //     <ScreenContainer>
  //       <Header>Текущие задачи</Header>
  //       <View style={styles.loadingContainer}>
  //         <Text style={[globalStyles.text500, { fontSize: 18 }]}>
  //           Задачи отсутсвуют
  //         </Text>
  //       </View>
  //     </ScreenContainer>
  //   );
  // }
  const { chats, isLoading } = useChatsController(user?.id);
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
  return (
    <ScreenContainer>
      <Header before={<GoBack />}>Текущие задачи</Header>
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { time, formattedDate } = formatDateTime(item.datetime);

            return (
              <View style={styles.section}>
                <Drawer
                 close={<Button onPress={handleSupportChat}>Связаться с поддержкой</Button>}
                  trigger={
                    <ServiceInfo
                      pet={item.pet}
                      time={time}
                      formattedDate={formattedDate}
                      service={item}
                    />
                  }
                >
                  <DrawerInfoEvent
                    key={item.id}
                    address={item.address}
                    nameService={item.mainService.name}
                    pet={item.pet}
                    // worker={item.worker ?? undefined}
                    datetime={item.datetime}
                    client={item.customer}
                  />
                </Drawer>
              </View>
            );
          }}
        />
      )}
    </ScreenContainer>
  );
}

export default CurrentTasks;
