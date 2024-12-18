import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useUserStore from '@entity/users/user.store';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import AddRecord from '@screens/add-record/AddRecord';
import Drawer from '@shared/ui/drawer/Drawer';
import Home from '@screens/home/Home';
import Chat from '@screens/chat/Chat';
import { useUserController } from '@entity/users/user.controller';
import { useFocusEffect } from '@react-navigation/native';
import Events from '@screens/events/Events';
import useRoleStore from '@screens/auth/role.store';
import CalendarEvent from '@screens/calendar-event/CalendarEvent';
import ProfileWorker from '@screens/profile-worker/ProfileWorker';
import ProfileUser from '@screens/profile-user/ProfileUser';
import WorkerEvents from '@screens/worker-events/WorkerEvents';
import CurrentTasks from '@screens/current-tasks/CurrentTasks';

const Tab = createBottomTabNavigator();

export default function AppStack() {
  const { user, setUser } = useUserStore();
  const { getMe } = useUserController();
  const { role } = useRoleStore();

  const [modalVisible, setModalVisible] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
    }, [])
  );

  const CustomTabBarButton = ({ children, onPress }: any) => (
    <Pressable
      style={{
        top: -10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 9999,
          backgroundColor: '#F8F8F8',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
  const CustomTabBarLabel = ({ focused, color, size, title }: any) => (
    <View style={{ alignItems: 'center', gap: 5 }}>
      <MaterialCommunityIcons name="plus" color={'black'} size={30} />
      <Text style={{textAlign: 'center', color: '#979797', fontSize: 10, paddingTop: 10 }}>
        {title}
      </Text>
    </View>
  );

  const WalkScreen = () => null;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 12, alignItems: 'center' },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          tabBarStyle: {
            height: 100,
            backgroundColor: '#F8F8F8',
            borderTopWidth: 0,
            borderRadius: 16,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: -0, height: -2 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
          },
        }}
      >
        {role === 'SITTER' ? (
    <Tab.Screen
      name="События"
      component={WorkerEvents}
      options={{
        tabBarLabel: 'События',
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <Octicons name={focused ? 'bell-fill' : 'bell'} size={32} color='#222222' />
        ),
      }}
    />
  ) : (
    <Tab.Screen
      name="main"
      component={Home}
      options={{
        tabBarLabel: 'Главная',
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
            name={focused ? 'home' : 'home-outline'}
            color={color}
            size={30}
          />
        ),
      }}
    />
  )}
        
        {role === 'SITTER' ? (
    <Tab.Screen
      name="records"
      component={CurrentTasks}
      options={{
        headerShown: false,
        tabBarLabel: 'Записи',
        tabBarIcon: ({ focused, color, size }) => (
         
          <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} size={32} color="black" />
        ),
      }}
    />
  ) : (
    <Tab.Screen
      name="events"
      component={Events}
      options={{
        headerShown: false,
        tabBarLabel: 'События',
        tabBarIcon: ({ focused, color, size }) => (
          <Octicons name={focused ? 'bell-fill' : 'bell'} size={32} color={focused ? '#273B4A' : '#222222'} />
        ),
      }}
    />
  )}

        <Tab.Screen
          name="Прогулка"
          component={WalkScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <CustomTabBarLabel
                color={color}
                size={size}
                title={role === 'SITTER' ? 'Заполнить отчеты' : 'Прогулка'}
              />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
                onPress={() => setModalVisible(true)}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="chat"
          component={Chat}
          options={{
            headerShown: false,
            tabBarLabel: 'Чат',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons name={focused ? 'chat' : 'chat-bubble-outline'} size={32} color="black" />
            ),
          }}
        />

        {role === 'SITTER' ? (
          <Tab.Screen
            name="profileUser"
            component={ProfileWorker}
            options={{
              headerShown: false,
              tabBarLabel: 'Профиль',
              tabBarIcon: ({ focused, color, size }) =>
                user?.meta.image ? (
                  <Image
                    source={{ uri: user.meta.image }}
                    style={{ width: 40, height: 40, borderRadius: 999 }}
                  />
                ) : (
                  <Image
                    source={require('@assets/signUp/avatarUser.png')}
                    style={{ width: 40, height: 40, borderRadius: 999 }}
                  />
                ),
            }}
          />
        ) : (
          <Tab.Screen
            name="profileWorker"
            component={ProfileUser}
            options={{
              headerShown: false,
              tabBarLabel: 'Профиль',
              tabBarIcon: ({ focused, color, size }) =>
                user?.meta.image ? (
                  <Image
                    source={{ uri: user.meta.image }}
                    style={{ width: 40, height: 40, borderRadius: 999 }}
                  />
                ) : (
                  <Image
                    source={require('@assets/signUp/avatarUser.png')}
                    style={{ width: 40, height: 40, borderRadius: 999 }}
                  />
                ),
            }}
          />
        )}
      </Tab.Navigator>
      <Drawer
        trigger={<View />} // Use an empty view as the trigger (handled by the button in the tab)
        modalVisible={modalVisible} // Pass the visibility state
        setModalVisible={setModalVisible} // Pass the function to change visibility
      >
        {role === 'SITTER' ? (
          <CalendarEvent setModalVisible={setModalVisible}/>
        ) : (
          <AddRecord setModalVisible={setModalVisible} />
        )}
      </Drawer>
    </>
  );
}
