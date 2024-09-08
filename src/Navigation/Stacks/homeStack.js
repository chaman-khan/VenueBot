import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTab from '../Tabs/BottomTab';
import VanueDetail from '../../screens/VanueDetail';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="VanueDetail" component={VanueDetail} />
    </Stack.Navigator>
  );
};
export default HomeStack;
