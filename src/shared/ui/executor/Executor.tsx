import globalStyles from '@shared/constants/globalStyles';
import React from 'react';
import { Image, Text, View } from 'react-native';

function Executor() {
  return (
    <View
      style={{
        alignItems: 'center',
        gap: 15,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        borderRadius: 16,
        padding: 10,
      }}
    >
      <Image
        source={require('@assets/events/executorUndefined.png')}
        style={{ width: 50, height: 50, borderRadius: 9999 }}
      />
      <Text
        style={[globalStyles.text500, { fontSize: 16, textAlign: 'center' }]}
      >
        Специалист еще не назначен
      </Text>
    </View>
  );
}

export default Executor;
