import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomTextInput from '../../components/Input';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavourite} from '../../Features/hotelsSlice';
import {Family} from '../../assets/FontFamily';
import {Colors} from '../../theme';
import {Assets} from '../../assets/images';
import {MyText} from '../../assets/Fonts';
import {elevation} from '../../theme/appStyles';

const Home = ({navigation}) => {
  const hotels = useSelector(state => state.hotels);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const showToast = () => {
    Toast.show({
      type: 'success',
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
        onPress={() =>
          navigation.navigate('VanueDetail', (props = {itemKey: item.key}))
        }>
        <Image
          source={item.images[0]}
          style={{
            width: '100%',
            height: 150,
            borderRadius: 20,
          }}
        />
        <MyText txt={item.name} heading lines={1} />
        <MyText
          txt={item.availability}
          paragrapgh
          style={{color: Colors.primary}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              width: '60%',
              alignItems: 'center',
            }}>
            <Entypo name="location-pin" size={12} color={Colors.primary} />

            <MyText txt={item.location} lines={1} paragrapgh />
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
        <MyText
          txt={'No Relative Data'}
          BigHeading
          style={{color: Colors.primary}}
        />
      </View>
    );
  };
  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
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
            <MyText txt={'Good Morning!'} style={{color: 'grey'}} />
            <MyText txt={'Chamman Khan'} heading />
          </View>
        </View>
        <TouchableOpacity style={styles.bell}>
          <Feather name="bell" size={20} />
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
  item: {
    width: '48%',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    gap: 6,
    ...elevation,
  },
});

export default Home;
