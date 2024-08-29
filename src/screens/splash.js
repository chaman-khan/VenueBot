import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Splash = () => {
  const {width, height} = Dimensions.get('screen');
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{width: width, height: height}}
        source={require('../images/splash.jpg')}
      />
    </View>
  );
};

export default Splash;
