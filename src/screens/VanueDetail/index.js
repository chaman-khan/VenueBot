import React from 'react';
import {Image, Text, View} from 'react-native';
const VanueDetail = ({navigation, route}) => {
  const item = route.params.item;
  return (
    <View style={{flex: 1, padding: 10}}>
      <Image
        source={item.img}
        style={{width: '100%', height: 250, borderRadius: 20}}
      />
    </View>
  );
};
export default VanueDetail;
