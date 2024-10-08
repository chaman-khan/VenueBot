import React, {useEffect} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {Assets} from '../../assets/images';

const Splash = ({navigation}) => {
  const {width, height} = Dimensions.get('screen');
  useEffect(() => {
    setTimeout(() => navigation.replace('AuthStack'), 3000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <Image style={{width: width, height: height}} source={Assets.splash} />
    </View>
  );
};

export default Splash;
