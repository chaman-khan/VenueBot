import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Family} from '../../components/family';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import Carousel from 'react-native-snap-carousel';
const VanueDetail = ({navigation, route}) => {
  const item = route.params.item;
  return (
    <View>
      <Image source={item.images[1]} style={{width: '100%', height: 250}} />
      <Carousel data />
      <View
        style={{
          position: 'absolute',
          paddingTop: 20,
          paddingHorizontal: 10,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Entypo name="arrow-long-left" size={30} color="white" />
        <View style={{flexDirection: 'row', gap: 20}}>
          <Entypo name="heart-outlined" size={30} color="white" />
          <Entypo name="share" size={30} color="white" />
          <Entypo name="share" size={30} color="white" />
          <Entypo name="share" size={30} color="white" />
        </View>
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.line} />
      <Text style={styles.heading}>Availability:</Text>
      <Text style={{fontFamily: Family}}>{item.availability}</Text>
      <View style={styles.line} />
      <Text style={styles.heading}>Reviews:</Text>
      <Text style={{fontFamily: Family}}>{item.availability}</Text>
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
