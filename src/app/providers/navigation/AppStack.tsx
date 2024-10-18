import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { APPSCREENS } from '@shared/constants/screens';
import { Screens } from '@shared/types/screens.type';
import React from 'react';

function AppStack() {
  const Stack = createNativeStackNavigator<Screens>();
  return (
    <Stack.Navigator>
      {APPSCREENS.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}

export default AppStack;
