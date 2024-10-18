import globalStyles from '@shared/constants/globalStyles';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

function NotificationsQuestion() {
  const [permissionGranted, setPermissionGranted] = useState(false); // Следим за состоянием разрешения

  // Функция для запроса разрешения
  const requestNotificationPermission = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Если разрешение не получено, запрашиваем его
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // Проверяем результат запроса разрешения
      if (finalStatus !== 'granted') {
        alert('Не удалось получить разрешение на отправку уведомлений!');
        return;
      }

      // Если разрешение получено, обновляем состояние
      setPermissionGranted(true);
    } else {
      alert('Уведомления работают только на реальных устройствах!');
    }
  };

  // Функция для отправки уведомления
  const sendTestNotification = async () => {
    if (permissionGranted) {
      console.log('Отправляем уведомление...');
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Проверка уведомления',
          body: 'Это тестовое уведомление!',
          sound: true,
        },
        trigger: null, // Немедленная отправка
      });
      console.log('Уведомление отправлено!');
    } else {
      alert('Сначала разрешите отправку уведомлений!');
    }
  };
  console.log('Permission granted:', permissionGranted);

  return (
    <ScreenContainer style={{ alignItems: "center", justifyContent: "center", gap: 20 }}>
      <Image
        source={require('@assets/screens/notifications/notifications.png')}
        style={{ width: 300, height: 300, borderRadius: 20 }}
      />
      <Text style={[globalStyles.text400, { fontSize: 18, textAlign: "center" }]}>
        Включите уведомления, чтобы{' '}
        <Text
          style={[globalStyles.text600, { fontSize: 18, color: '#51582F' }]}
        >
          не пропустить звонки и важные напоминания
        </Text>{' '}
        от команды
      </Text>

      {/* Кнопка для запроса разрешений */}
      <Button onPress={requestNotificationPermission}>Хочу получать уведомления</Button>

      {/* Кнопка для тестового уведомления будет доступна только после получения разрешений */}
      {permissionGranted && (
        <Button onPress={sendTestNotification}>
          Отправить тестовое уведомление
        </Button>
      )}

      <TouchableOpacity>
        <Text style={[globalStyles.text500, { opacity: 0.5 }]}>
          Не беспокойте меня
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

export default NotificationsQuestion;
