import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomItemScreen from '../../components/CustomItemScreen';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {Colors} from '../../theme';
import Toast from 'react-native-toast-message';
import {MyText} from '../../assets/Fonts';

const {width, height} = Dimensions.get('screen');

const Favourites = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [length, setLength] = useState(null);
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
      <CustomItemScreen type2={show} favourites navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Favourites;
