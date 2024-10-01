import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CustomItemScreen from '../../components/CustomItemScreen';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {Colors} from '../../theme';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const Favourites = ({navigation}) => {
  const hotels = useSelector(state => state.data.hotels);
  const validHotels = Object.values(hotels).filter(
    item => item.favourite === true,
  );
  const [show, setShow] = useState(false);
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Commig Soon 👋',
    });
  };
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar
        title={'Favourites'}
        leftImage={Assets.logo}
        leftImageColor={Colors.primary}
        rightImg1={'magnifying-glass'}
        rightImg2={'list'}
        rightimagesColor={'grey'}
        rightImgs
        right2Click={showToast}
        right1Click={() => setShow(!show)}
        style={{paddingVertical: 10}}
      />
      <CustomItemScreen
        data={validHotels}
        type2={show}
        favourites
        navigation={navigation}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Favourites;
