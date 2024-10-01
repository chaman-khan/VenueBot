import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Assets} from '../../assets/images';
import {MyText} from '../../assets/Fonts';
import {elevation} from '../../theme/appStyles';
import CustomItemScreen from '../../components/CustomItemScreen';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const hotels = useSelector(state => state.data.hotels);
  const validHotels = Object.values(hotels).filter(item => item.key);
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image
            source={Assets.dp}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View
            style={{
              height: '80%',
              justifyContent: 'space-between',
            }}>
            <MyText title={'Good Morning!'} style={{color: 'grey'}} />
            <MyText title={'Chamman Khan'} heading />
          </View>
        </View>
        <TouchableOpacity style={styles.bell}>
          <Feather name="bell" size={20} />
        </TouchableOpacity>
      </View>

      <CustomItemScreen type1 navigation={navigation} data={validHotels} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeader: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'flex-end',
    gap: 10,
    height: 50,
  },
  bell: {
    borderRadius: 30,
    padding: 10,
    ...elevation,
    backgroundColor: 'white',
  },
});

export default Home;
