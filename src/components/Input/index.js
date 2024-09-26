import React, {useState} from 'react';
import {
  TextInput,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Family} from '../../assets/FontFamily';

const {width} = Dimensions.get('screen');

const CustomTextInput = ({
  placeholder,
  value,
  keyboardType,
  leftImg,
  rightImg,
  secure,
  rightClick,
  touch,
  onPress,
  width,
  rightColor,
  leftColor,
  lftChkd,
  onChangeText,
  maxHeight,
  full,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        ...styles.mail,
        paddingHorizontal: touch ? 20 : 10,
        width: width ? width : '90%',
        marginBottom: 10,
        height: maxHeight ? maxHeight : 50,
      }}>
      {leftImg && (
        <Entypo
          name={leftImg}
          size={20}
          color={!lftChkd ? 'transparent' : leftColor ? leftColor : 'black'}
        />
      )}
      <TextInput
        multiline={full}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        style={{
          width: rightImg ? '80%' : '92%',
          fontFamily: Family,
          height: '100%',
        }}
        editable={!touch}
      />
      {rightImg && (
        <TouchableOpacity activeOpacity={1} onPress={rightClick}>
          <Entypo
            name={rightImg}
            size={20}
            color={rightColor ? rightColor : 'gray'}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mail: {
    flexDirection: 'row',
    gap: 10,
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CustomTextInput;
