import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Family} from '../../components/family';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomTextInput from '../../components/customInput';
import Toast from 'react-native-toast-message';
import {Colors} from '../../components/colors';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavourite} from '../../Features/hotelsSlice';

const Home = ({navigation}) => {
  const hotels = useSelector(state => state.hotels);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const showToast = () => {
    Toast.show({
      type: 'success',
      // text1: 'Hello',
      text1: 'Commig Soon 👋',
    });
  };
  const validHotels = Object.values(hotels).filter(item => item.key);

  const filteredHotels = validHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('VanueDetail', (props = {item}))}>
        <Image
          source={item.images[0]}
          style={{width: '100%', height: 150, borderRadius: 20}}
        />
        <Text numberOfLines={1} style={styles.name}>
          {item.name}
        </Text>
        <Text style={{color: Colors.primary, fontSize: 13, fontFamily: Family}}>
          {item.availability}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', gap: 5, width: '60%'}}>
            <Entypo name="location-pin" size={20} color={Colors.primary} />
            <Text numberOfLines={1} style={{fontFamily: Family}}>
              {item.location}
            </Text>
          </View>
          <TouchableOpacity onPress={() => dispatch(toggleFavourite(item.key))}>
            <Entypo
              name={item.favourite ? 'heart' : 'heart-outlined'}
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  const EmptyComponent = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 500,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'red', fontFamily: Family, fontSize: 30}}>
          No Relative Data
        </Text>
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image
            source={require('../../images/dp.png')}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
          <View>
            <Text style={styles.morning}>Good Morning!</Text>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', fontFamily: Family}}>
              Chamman Khan
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bell}>
          <Feather name="bell" size={30} />
        </TouchableOpacity>
      </View>
      <CustomTextInput
        leftImg={'magnifying-glass'}
        placeholder={'What Vanue are you looking for...'}
        width={'100%'}
        rightImg={'list'}
        rightClick={showToast}
        rightColor={Colors.primary}
        leftColor={'grey'}
        value={searchQuery}
        onPress={txt => setSearchQuery(txt)}
      />
      <FlatList
        data={filteredHotels}
        renderItem={renderItem}
        style={{width: '100%', paddingVertical: 10, marginBottom: 150}}
        keyExtractor={item => item.key}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        ListEmptyComponent={EmptyComponent}
      />
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
    width: '65%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  morning: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '300',
    fontFamily: Family,
  },
  bell: {
    borderColor: 'lightgray',
    borderWidth: 2,
    borderRadius: 30,
    padding: 5,
  },
  item: {
    width: '48%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Family,
    width: '100%',
  },
});

export default Home;
