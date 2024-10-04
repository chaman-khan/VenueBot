import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Family} from '../../assets/FontFamily';

const TopBar = ({
  onPress,
  title,
  leftImage,
  leftImageColor,
  rightImgs,
  rightImg1,
  rightImg2,
  rightimagesColor,
  right1Click,
  right2Click,
  style,
  rightImg2Size,
  styleRightImage2,
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        ...style,
      }}>
      {leftImage ? (
        <Image
          source={leftImage}
          style={{width: 30, height: 30, tintColor: leftImageColor}}
        />
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Entypo
            name="arrow-long-left"
            size={30}
            color={leftImageColor ? leftImageColor : 'black'}
          />
        </TouchableOpacity>
      )}
      <Text style={{fontFamily: Family, fontSize: 24, fontWeight: 'bold'}}>
        {title}
      </Text>
      {rightImgs ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity activeOpacity={1} onPress={right1Click}>
            <Entypo name={rightImg1} size={30} color={rightimagesColor} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={right2Click}
            style={styleRightImage2}>
            <Entypo
              name={rightImg2}
              size={rightImg2Size ? rightImg2Size : 30}
              color={rightimagesColor}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Entypo name="arrow-long-left" size={30} color="transparent" />
      )}
    </View>
  );
};
export default TopBar;
