import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTab from '../Tabs/BottomTab';
import VanueDetail from '../../screens/VanueDetail';
import Location from '../../screens/Location';
import Reviews from '../../screens/Reviews';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="VanueDetail" component={VanueDetail} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Reviews" component={Reviews} />
    </Stack.Navigator>
  );
};
export default HomeStack;
