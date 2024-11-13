import globalStyles from '@shared/constants/globalStyles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';
import ImageRecord from '@shared/ui/image-record/ImageRecord';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  setModalVisible?: (visible: boolean) => void; 
}
function CalendarEvent({ setModalVisible }: Props) {
  const navigation = useAppNavigation();

  const handlePress = (route: any) => {
    if (setModalVisible) setModalVisible(false);
    

    // Немного задерживаем навигацию, чтобы модальное окно успело закрыться
    setTimeout(() => {
      navigation.navigate(route);
    }, 300);
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
    </View>
  );
}

export default CalendarEvent;
