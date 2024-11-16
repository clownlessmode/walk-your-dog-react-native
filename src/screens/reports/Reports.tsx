import { useReportController } from '@entity/reports/reports.controller';
import useUserStore from '@entity/users/user.store';
import GoBack from '@features/go-back/GoBack';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import Header from '@shared/ui/header/Header';
import ServiceInfo from '@shared/ui/service-info/ServiceInfo';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';

function Reports() {
    const navigation = useAppNavigation()
  const { user } = useUserStore();
  const { reportWaiting } = useReportController(user?.id);
  console.log("OTCHETI", reportWaiting)
  const [localReportWaiting, setLocalReportWaiting] = useState(
    reportWaiting || []
  );
  useEffect(() => {
    if (reportWaiting && reportWaiting.length > 0) {
      setLocalReportWaiting(reportWaiting);
    }
  }, [reportWaiting]);

  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const filteredServices =
    localReportWaiting
      ?.map((service) => {
        console.info('STATUS', service.status);
        const serviceDate = new Date(service.datetime);
        const isIncludedStatus = [
          'Ожидание отчёта',
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
  return (
    <ScreenContainer>
        <Header before={<GoBack />}>Отчеты</Header>
      <FlatList
        data={filteredServices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const { time, formattedDate } = formatDateTime(item.datetime);
          return (
            <TouchableOpacity onPress={() => navigation.navigate('finishedEvent', {serviceId: item.id})}>
            <ServiceInfo
              pet={item.pet}
              time={time}
              formattedDate={formattedDate}
              service={item}
            />
            </TouchableOpacity>
          );
        }}
      />
    </ScreenContainer>
  );
}

export default Reports;
