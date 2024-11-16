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
    navigation.navigate(route);
      if (setModalVisible) setModalVisible(false);
    
  };

  return (
    <View style={{ alignItems: 'center', gap: 20 }}>
      <Text style={[globalStyles.text500, { fontSize: 16 }]}>
        Добавление отчетов
      </Text>
      <ImageRecord
        onPress={() => handlePress('reports')}
        variant="reminder"
        title="Добавить отчет"
      />
    </View>
  );
}

export default CalendarEvent;
