import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Family} from './family';
import {Colors} from './colors';

const CustomButton = ({
  title,
  width,
  bgClr,
  txtSize,
  marginVertical,
  mBottom,
  onClick,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.btn,
        width: width,
        backgroundColor: bgClr,
        marginVertical: marginVertical,
        marginBottom: mBottom,
      }}>
      <Text
        style={{
          fontFamily: Family,
          fontSize: txtSize,
          color: 'white',
          // fontWeight: '600',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomButton;
