import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {useSelector} from 'react-redux';
import {MyText} from '../../assets/Fonts';
import {Colors} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/Buttton';
import {elevation} from '../../theme/appStyles';

const Booking = () => {
  const bookings = useSelector(state => state.data.bookings);

  const categories = ['Upcoming', 'Completed', 'Cancelled'];
  const [selected, setSelected] = useState('Upcoming');
  const renderItem = ({item}) => {
    return (
      <View style={styles.view}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image source={item.data[0].images[0]} style={styles.img} />
          <View style={{width: '60%', gap: 10}}>
            <MyText title={item.data[0].name} heading lines={1} />
            <MyText
              title={item.data[0].availability}
              paragrapgh
              style={{color: Colors.primary}}
            />
            <View style={styles.bottomEndView}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Entypo name="location-pin" size={12} color={Colors.primary} />
                <MyText title={item.data[0].location} lines={1} paragrapgh />
              </View>
              <View style={styles.status}>
                <MyText
                  title={item.status}
                  style={{color: Colors.primary}}
                  tiny
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.btns}>
          <CustomButton
            title="Cancel Booking"
            width="40%"
            bgClr="rgb(249, 229, 248)"
            height={30}
            txtStyle={{color: Colors.primary}}
          />
          <CustomButton title="Complete" width="40%" height={30} />
        </View>
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar
        title={'Bookings'}
        leftImage={Assets.logo}
        rightImgs
        rightImg1={'magnifying-glass'}
        rightImg2={'dots-three-horizontal'}
        rightImg2Size={20}
        styleRightImage2={{
          borderWidth: 1,
          borderRadius: 30,
          borderColor: 'black',
          padding: 2,
        }}
      />
      <View style={styles.topLine}>
        {categories.map(item => {
          const isSelected = item === selected;
          return (
            <View style={{flex: 1, alignItems: 'center'}}>
              <MyText
                title={item}
                heading
                onPress={() => setSelected(item)}
                style={{
                  color: isSelected ? Colors.primary : 'grey',
                  padding: 5,
                  paddingVertical: 10,
                }}
              />
              <View
                style={{
                  width: '100%',
                  height: isSelected ? 2 : 1,
                  backgroundColor: isSelected ? Colors.primary : 'grey',
                }}
              />
            </View>
          );
        })}
      </View>
      <FlatList data={bookings} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  topLine: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    ...elevation,
  },
  img: {
    width: '35%',
    height: 110,
    borderRadius: 20,
  },
  line: {
    width: '90%',
    alignSelf: 'center',
    height: 1,
    marginVertical: 7,
    backgroundColor: 'lightgrey',
  },
  bottomEndView: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btns: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    width: 40,
    height: 20,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Booking;
