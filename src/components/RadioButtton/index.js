import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Family} from '../../assets/FontFamily';
import {Colors} from '../../theme';
import {elevation} from '../../theme/appStyles';
import Entypo from 'react-native-vector-icons/FontAwesome';
import {MyText} from '../../assets/Fonts';

const CustomRadioButton = ({options, selectedOption, onSelect, type2}) => {
  const formatTitle = (title, secure) => {
    if (secure) {
      const visiblePart = title.slice(-4);
      const hiddenPart = title.slice(0, -4).replace(/\S/g, '•');
      return `${hiddenPart}${visiblePart}`;
    } else return title;
  };
  return (
    <View style={type2 ? styles.container1 : styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          style={type2 ? styles.radioButton1 : styles.radioButton}
          onPress={() => onSelect(option)}>
          {!type2 && (
            <View style={styles.outerCircle}>
              {selectedOption === option && <View style={styles.innerCircle} />}
            </View>
          )}
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
            {type2 && (
              <Entypo name={option.img} size={30} color={Colors.primary} />
            )}
            <MyText
              title={formatTitle(type2 ? option.title : option, option.secure)}
            />
          </View>
          {type2 && (
            <View
              style={{
                ...styles.outerCircle,
                borderColor: Colors.primary,
                borderWidth: 2,
              }}>
              {selectedOption === option.title && (
                <View style={styles.innerCircle} />
              )}
            </View>
          )}
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
  container1: {
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButton1: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    ...elevation,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 14,
    width: 14,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
});

export default CustomRadioButton;
