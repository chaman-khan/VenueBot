import React from 'react';
import {
  TextInput,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from './colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {Family} from './family';

const {width} = Dimensions.get('screen');

const CustomTextInput = ({
  placeholder,
  value,
  keyboardType,
  leftImg,
  rightImg,
  widthInput,
  secure,
  rightClick,
  touch,
  onPress,
  width,
  rightColor,
  leftColor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={{
        ...styles.mail,
        paddingHorizontal: touch ? 20 : 10,
        width: width ? width : '90%',
      }}>
      {leftImg && (
        <Entypo
          name={leftImg}
          size={20}
          color={leftColor ? leftColor : 'black'}
        />
      )}
      <TextInput
        keyboardType={keyboardType}
        value={value}
        onChangeText={onPress}
        placeholder={placeholder}
        secureTextEntry={secure}
        style={{
          width: rightImg ? '80%' : '92%',
          fontFamily: Family,
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
    alignItems: 'center',
    gap: 10,
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default CustomTextInput;
