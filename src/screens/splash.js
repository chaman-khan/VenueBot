import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Assets} from '../assets/images';

const Splash = () => {
  const {width, height} = Dimensions.get('screen');
  return (
    <View style={{flex: 1}}>
      <Image style={{width: width, height: height}} source={Assets.splash} />
    </View>
  );
};

export default Splash;
