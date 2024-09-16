import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../Colors/colors';
import {Family} from '../FontFamily/family';

const CustomRadioButton = ({options, selectedOption, onSelect}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          style={styles.radioButton}
          onPress={() => onSelect(option)}>
          <View style={styles.outerCircle}>
            {selectedOption === option && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.label}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  label: {marginLeft: 5, fontWeight: '300', fontFamily: Family},
});

export default CustomRadioButton;
