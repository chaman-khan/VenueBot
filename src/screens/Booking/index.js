import React, {useState} from 'react';
import {Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {useSelector} from 'react-redux';
import {MyText} from '../../assets/Fonts';
import {Colors} from '../../theme';

const Booking = () => {
  const bookigs = useSelector(state => state.data.bookings);
  console.log('bookigs', bookigs);

  const categories = ['Upcoming', 'Completed', 'Cancelled'];
  const [selected, setSelected] = useState('Upcoming');
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
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
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
    </View>
  );
};

export default Booking;
