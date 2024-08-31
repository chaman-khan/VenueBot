import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Family} from './family';
import {Colors} from './colors';

const CustomButton = ({title, width, bgClr, txtSize, marginVertical}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.btn,
        width: width,
        backgroundColor: bgClr,
        marginVertical: marginVertical,
      }}>
      <Text style={{fontFamily: Family, fontSize: txtSize, color: 'white'}}>
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
    marginBottom: 100,
  },
});

export default CustomButton;
