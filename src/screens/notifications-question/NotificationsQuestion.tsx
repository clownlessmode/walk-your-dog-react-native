import globalStyles from '@shared/constants/globalStyles';
import Button from '@shared/ui/button/Button';
import ScreenContainer from '@shared/ui/containers/ScreenContainer';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { registerIndieID } from 'native-notify';
import useUserStore from '@entity/users/user.store';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

function NotificationsQuestion() {
  const navigation = useAppNavigation()
  const { user } = useUserStore()
 
const onSubmit = () => {
  registerIndieID(user?.id, 24230, 'F4CZByJ4fRNUi31zZPdEBp');
  navigation.navigate('appStack')
}
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
      <Button onPress={onSubmit}>Хочу получать уведомления</Button>

      <TouchableOpacity>
        <Text style={[globalStyles.text500, { opacity: 0.5 }]}>
          Не беспокойте меня
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

export default NotificationsQuestion;
