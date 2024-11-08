import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useUserStore from "@entity/users/user.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "@screens/profile/Profile";
import AddRecord from "@screens/add-record/AddRecord";
import Drawer from "@shared/ui/drawer/Drawer";
import Home from "@screens/home/Home";


const Tab = createBottomTabNavigator();

export default function AppStack() {
  const { user } = useUserStore()
  const [modalVisible, setModalVisible] = React.useState(false);
  const CustomTabBarButton = ({ children, onPress }:any) => (
    <Pressable
      style={{
        top: -10, // Поднятие кнопки вверх
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
  const CustomTabBarLabel = ({ focused, color, size }:any) => (
    <View style={{ alignItems: 'center', gap: 5 }}>
      <MaterialCommunityIcons name="plus" color={"black"} size={30} />
      <Text style={{ color: "#979797", fontSize: 10, paddingTop: 10 }}>Прогулка</Text>
    </View>
  );

  const WalkScreen = () => null;

  return (
    <>
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12, alignItems: "center" },
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: "white", borderBottomWidth: 0, shadowOpacity: 0},
        tabBarStyle: {
          height: 100,
          backgroundColor: "#F8F8F8",
          borderTopWidth: 0,
          borderRadius: 16,
          elevation: 4,
          shadowColor: '#000', 
          shadowOffset: { width: -0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        }
      }}
    >
      {/* <Tab.Screen
        name="Events"
        component={Events}
        options={{
          tabBarLabel: "События",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "bell" : "bell-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Главная",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Записи"
        component={Posts}
        options={{
          tabBarLabel: "Записи",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "clipboard" : "clipboard-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      /> */}
        <Tab.Screen
        name="Прогулка"
        component={WalkScreen} // Пустой компонент, так как это не страница
        options={{
          tabBarIcon: ({ color, size }) => (
            <CustomTabBarLabel color={color} size={size} />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} onPress={() => setModalVisible(true)} />
          ),
          tabBarLabel: () => null
        }}
      />
      {/* <Tab.Screen
        name="Чат"
        component={Chat}
        options={{
          tabBarLabel: "Чат",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "chat" : "chat-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Профиль"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            user?.meta.image ? (
              <Image
                source={{ uri: user.meta.image }}
                style={{ width: 40, height: 40, borderRadius: 999 }}
              />
            ) : (
              <Image
                source={require("@assets/signUp/EmptyAvatar.png")}
                style={{ width: 40, height: 40, borderRadius: 999 }}
              />
            )
          ),
        }}
      />
    </Tab.Navigator>
    <Drawer
        trigger={<View />} // Use an empty view as the trigger (handled by the button in the tab)
        modalVisible={modalVisible} // Pass the visibility state
        setModalVisible={setModalVisible} // Pass the function to change visibility
      >
        <AddRecord setModalVisible={setModalVisible}/> 
      </Drawer>
     </>
  );
}