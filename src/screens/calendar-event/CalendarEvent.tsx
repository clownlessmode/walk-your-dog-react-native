import useUserStore from '@entity/users/user.store';
import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ImageRecord from '@shared/ui/image-record/ImageRecord';
import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

interface Props {
  setModalVisible?: (visible: boolean) => void; // Типизация функции
}
function CalendarEvent({ setModalVisible }: Props) {
  const { user } = useUserStore();
  const navigation = useAppNavigation();

  const handlePress = (route: any) => {
    navigation.navigate(route);
    if (setModalVisible) setModalVisible(false);
  };

  return (
    <View style={{ alignItems: 'center', gap: 20 }}>
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>
        Календарь событий
      </Text>
      <ImageRecord
        onPress={() => handlePress('addEvent')}
        variant="reminder"
        title="Добавить окна для записи"
      />
      <ImageRecord
        onPress={() => handlePress('service')}
        variant="service"
        title="Текущие записи в работу"
      />
    </View>
  );
}

export default CalendarEvent;
