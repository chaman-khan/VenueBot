import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Family} from '../../../assets/FontFamily';
import {Colors} from '../../../theme';
import {MyText} from '../../../assets/Fonts';
import Home from '../../../screens/Home';
import Booking from '../../../screens/Booking';
import Favourites from '../../../screens/Favourites';
import Profile from '../../../screens/Profile';

const ICON_SIZE = 20;
const SELECTED_ICON_SIZE = 25;
const HomeTab = () => {
  const Stack = createBottomTabNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          height: 55,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          paddingTop: 6,
          paddingBottom: 3,
        },
        tabBarIcon: {size: 12},
        tabBarLabelStyle: {fontSize: 14, fontFamily: Family},
        tabBarInactiveTintColor: 'rgba(2555, 255,255, 0.4)',
        tabBarActiveTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused ? <MyText title={'Home'} style={{color: 'white'}} /> : null,
          tabBarIcon: ({color, focused}) => (
            <Entypo
              name="home"
              size={focused ? SELECTED_ICON_SIZE : ICON_SIZE}
              color={color}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused && <MyText title={'Booking'} style={{color: 'white'}} />,
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name="book-multiple"
              color={color}
              size={ICON_SIZE}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused ? (
              <MyText title={'Favourites'} style={{color: 'white'}} />
            ) : null,
          tabBarIcon: ({color, focused}) => (
            <Entypo name="heart" color={color} size={ICON_SIZE} />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused ? (
              <MyText title={'Profile'} style={{color: 'white'}} />
            ) : null,
          tabBarIcon: ({color, focused}) => (
            <Entypo name="user" color={color} size={ICON_SIZE} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeTab;
