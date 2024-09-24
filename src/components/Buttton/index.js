import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Family} from '../../assets/FontFamily';
import {Colors} from '../../theme';
import {Assets} from '../../assets/images';

const CustomButton = ({
  title = 'Title',
  width = '90%',
  txtSize,
  marginVertical,
  mBottom,
  onClick,
  icon,
  txtStyle,
  buttonStyle,
  bgClr = Colors.primary,
  height = 50,
  iconSize,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        {
          height: height,
          width: width,
          marginVertical: marginVertical,
          marginBottom: mBottom,
          borderRadius: 10,
          alignItems: 'center',
          backgroundColor: bgClr,
          justifyContent: 'center',
          flexDirection: icon ? 'row' : 'column',
        },
        buttonStyle,
        style,
      ]}>
      {icon && (
        <Image source={icon} style={{height: iconSize, width: iconSize}} />
      )}
      <Text
        style={{
          fontFamily: Family,
          fontSize: txtSize,
          marginLeft: icon ? 10 : 0,
          color: 'white',
          ...txtStyle,
          // fontWeight: '600',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default CustomButton;
