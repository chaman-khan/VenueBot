import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../../../screens/Home';
import Booking from '../../../screens/Booking';
import Saved from '../../../screens/Saved';
import Profile from '../../../screens/Profile';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../components/colors';

const HomeTab = () => {
  const Stack = createBottomTabNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          height: 55,
        },
        tabBarLabelStyle: {fontSize: 14},
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="book-multiple"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="heart" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="user" color={color} size={size} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeTab;
