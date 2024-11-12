import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';
import Drawer from '../drawer/Drawer';
import DrawerInfo from '../drawer-info/DrawerInfo';

interface Props {
  checked: boolean;
  onPress?: () => void; // Уточняем тип функции onPress
  title?: string;
  price?: number | string; // Поддерживаем как число, так и строку
  showInfoButton?: boolean; // Опциональный пропс для отображения кнопки "i"
  disabled?: boolean | null; // Опциональный пропс для отключения кнопки
}
const RadioButton = ({
  checked,
  onPress,
  title,
  price,
  showInfoButton = false,
  disabled
}: Props) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={disabled ? undefined : onPress}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View
            style={[styles.radioButton, checked && styles.radioButtonChecked]}
          >
            {checked && (
              <MaterialCommunityIcons name="check" size={16} color="white" />
            )}
          </View>
          <Text style={[globalStyles.text500, { fontSize: 16 }]}>{title}</Text>
        </View>
      </TouchableOpacity>
      {showInfoButton && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={ [globalStyles.text500, {fontSize: 16}]}>{price} руб</Text>
          <Drawer
            close="Понятно"
            trigger={
              <View style={styles.triggerButton}>
                <Text>i</Text>
              </View>
            }
          >
            <View>
              <DrawerInfo />
            </View>
          </Drawer>
        </View>
      )}
    </View>
  );
};

export default RadioButton;
