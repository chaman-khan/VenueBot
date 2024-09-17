import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Family} from '../../assets/FontFamily';

const TopBar = ({onPress, title}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={onPress}>
        <Entypo name="arrow-long-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={{fontFamily: Family, fontSize: 24, fontWeight: 'bold'}}>
        {title}
      </Text>
      <Entypo name="arrow-long-left" size={30} color="transparent" />
    </View>
  );
};
export default TopBar;
