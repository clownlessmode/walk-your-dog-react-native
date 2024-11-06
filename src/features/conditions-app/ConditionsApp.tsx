import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import globalStyles from '@shared/constants/globalStyles';

function ConditionsApp() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={[globalStyles.text400, styles.conditionsText]}>
        Продолжая, вы соглашаетесь с{' '}
        <Text
          style={[globalStyles.text500, { fontSize: 16, color: '#51582F' }]}
        >
          условиями использования приложения
        </Text>
      </Text>
    </View>
  );
}

export default ConditionsApp;
