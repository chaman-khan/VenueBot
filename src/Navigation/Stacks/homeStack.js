import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeTab from '../Tabs/BottomTab';
import VanueDetail from '../../screens/VanueDetail';
import Location from '../../screens/Location';
import Reviews from '../../screens/Reviews';
import BookEvent from '../../screens/BookEvent';
import ContactInfo from '../../screens/ContactInfo';
import Payments from '../../screens/Payments';
import AddNewCard from '../../screens/AddNewCard';
import ReviewSummary from '../../screens/ReviewSummary';
import EnterYourPin from '../../screens/EnterYourPin';
import E_Ticket from '../../screens/E_Ticket';
import UserProfile from '../../screens/UserProfile';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="VanueDetail" component={VanueDetail} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="BookEvent" component={BookEvent} />
      <Stack.Screen name="ContactInfo" component={ContactInfo} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="AddNewCard" component={AddNewCard} />
      <Stack.Screen name="ReviewSummary" component={ReviewSummary} />
      <Stack.Screen name="EnterYourPin" component={EnterYourPin} />
      <Stack.Screen name="E_Ticket" component={E_Ticket} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};
export default HomeStack;
