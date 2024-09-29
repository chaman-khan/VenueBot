import React from 'react';
import {Text, View} from 'react-native';
import TopBar from '../../components/TopBar';

const ReviewSummary = ({navigation}) => {
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar title={'Review Summary'} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ReviewSummary;
