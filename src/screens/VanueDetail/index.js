import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Family} from '../../components/family';
const VanueDetail = ({navigation, route}) => {
  const item = route.params.item;
  return (
    <View style={{flex: 1, padding: 10}}>
      <Image
        source={item.img}
        style={{width: '100%', height: 250, borderRadius: 20}}
      />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.line} />
      <Text style={styles.heading}>
        Availability:
        <View
          style={{height: 1, backgroundColor: 'lightgrey', width: '100%'}}
        />
      </Text>
      <Text style={{fontFamily: Family}}>{item.availability}</Text>
      <View style={styles.line} />
    </View>
  );
};
const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: Family,
    marginTop: 10,
  },
  heading: {
    fontSize: 18,
    fontFamily: Family,
    fontWeight: '500',
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
    marginVertical: 10,
  },
});
export default VanueDetail;
