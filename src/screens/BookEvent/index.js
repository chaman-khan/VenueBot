import React from 'react';
import {Text, View} from 'react-native';
import TopBar from '../../components/TopBar/topBar';
const BookEvent = ({navigation}) => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <TopBar onPress={() => navigation.goBack()} title={'Book Venue'} />
    </View>
  );
};

export default BookEvent;
