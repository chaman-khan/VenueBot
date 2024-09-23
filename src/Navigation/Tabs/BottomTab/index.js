import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../../../screens/Home';
import Booking from '../../../screens/Booking';
import Saved from '../../../screens/Saved';
import Profile from '../../../screens/Profile';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Family} from '../../../assets/FontFamily';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../theme';
import {MyText} from '../../../assets/Fonts';

const ICON_SIZE = 20;
const SELECTED_ICON_SIZE = 25;
const HomeTab = () => {
  const Stack = createBottomTabNavigator();
  function CustomTabBar({state, descriptors, navigation}) {
    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <View
              key={index}
              style={[styles.tabItem, isFocused && styles.tabItemSelected]}>
              <Text onPress={onPress} style={styles.tabText}>
                {label}
              </Text>
              {isFocused && <View style={styles.overlay} />}
            </View>
          );
        })}
      </View>
    );
  }
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
        name="Saved"
        component={Saved}
        options={{
          tabBarLabel: ({color, focused}) =>
            focused ? (
              <MyText title={'Saved'} style={{color: 'white'}} />
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
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabBar: {
//     flexDirection: 'row',
//     height: 60,
//     backgroundColor: '#eee',
//   },
//   tabItem: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   tabItemSelected: {
//     backgroundColor: '#ddd',
//   },
//   tabText: {
//     fontSize: 16,
//   },
//   overlay: {
//     position: 'absolute',
//     top: -10,
//     width: 20,
//     height: 20,
//     backgroundColor: 'red',
//     borderRadius: 10,
//   },
// });
export default HomeTab;
