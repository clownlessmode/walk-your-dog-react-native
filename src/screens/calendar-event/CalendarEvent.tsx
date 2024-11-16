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
        Календарь событий
      </Text>
      <ImageRecord
        onPress={() => handlePress('addEvent')}
        variant="reminder"
        title="Добавить отчет"
      />
    </View>
  );
}

export default CalendarEvent;
