import React, {useRef, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../theme';
import CustomTextInput from '../../components/Input';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {MyText} from '../../assets/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {toggleFavourite} from '../../Features/dataSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomButton from '../Buttton';
import {styles} from './styles';

const CustomItemScreen = ({data, type1, type2, favourites, navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [columns, setColumns] = useState(favourites ? 1 : 2);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Commig Soon 👋',
    });
  };
  const refRBSheet = useRef();
  const filteredHotels = data.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const delFromFavourite = () => {
    refRBSheet.current.close();

    dispatch(toggleFavourite(selectedItem?.key));
  };
  const showBottomSheet = item => {
    setSelectedItem(item);
    refRBSheet.current.open();
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.item,
          flexDirection: columns == 2 ? 'column' : 'row',
          width: columns == 2 ? '48%' : '100%',
          alignItems: columns == 1 && 'center',
          justifyContent: columns == 1 && 'space-between',
        }}
        onPress={() =>
          navigation.navigate('VanueDetail', (props = {itemKey: item.key}))
        }>
        <Image
          source={item.images[0]}
          style={{
            width: columns == 2 ? '100%' : '35%',
            height: columns == 2 ? 150 : 110,
            borderRadius: 20,
          }}
        />
        <View style={{gap: 6, width: columns == 2 ? '100%' : '60%'}}>
          <MyText title={item.name} heading lines={1} />
          <MyText
            title={item.availability}
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

              <MyText title={item.location} lines={1} paragrapgh />
            </View>
            <TouchableOpacity
              onPress={() =>
                favourites
                  ? showBottomSheet(item)
                  : dispatch(toggleFavourite(item.key))
              }>
              <Entypo
                name={item.favourite ? 'heart' : 'heart-outlined'}
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {type1 && (
        <CustomTextInput
          leftImg={'magnifying-glass'}
          placeholder={'What Vanue are you looking for...'}
          width={'100%'}
          rightImg={'list'}
          rightClick={showToast}
          rightColor={Colors.primary}
          leftColor={'grey'}
          value={searchQuery}
          onChangeText={txt => setSearchQuery(txt)}
          lftChkd
        />
      )}
      {type2 && (
        <CustomTextInput
          placeholder={'What Favourite Vanue are you looking for...'}
          width={'100%'}
          value={searchQuery}
          onChangeText={txt => setSearchQuery(txt)}
          lftChkd
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <MyText
          title={`${filteredHotels.length} ${
            type1 ? 'Items' : 'Favourites Items'
          } found`}
          heading
          style={{flex: 0.8, marginBottom: 5}}
        />
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-end',
          }}>
          <Entypo
            name="list"
            size={20}
            color={'red'}
            onPress={() => setColumns(1)}
          />
          <Entypo
            name="grid"
            size={20}
            color={'red'}
            onPress={() => setColumns(2)}
          />
        </View>
      </View>
      <FlatList
        data={filteredHotels}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          paddingVertical: 10,
          marginBottom: type1 ? 310 : !type2 ? 150 : 310,
        }}
        numColumns={columns}
        key={columns}
        keyExtractor={item => item.key}
        columnWrapperStyle={columns == 2 && {justifyContent: 'space-between'}}
        // ListEmptyComponent={EmptyComponent}
      />
      <RBSheet
        ref={refRBSheet}
        draggable
        height={330}
        customStyles={{
          container: {
            borderRadius: 20,
          },
        }}>
        <View style={{paddingHorizontal: '5%', alignItems: 'center'}}>
          <MyText title="Remove From Favourites?" BigHeading />
          <View style={styles.line} />
          {selectedItem && (
            <View style={styles.bottomView}>
              <Image source={selectedItem.images[0]} style={styles.img} />
              <View style={{width: '60%', gap: 10}}>
                <MyText title={selectedItem.name} heading lines={1} />
                <MyText
                  title={selectedItem.availability}
                  paragrapgh
                  style={{color: Colors.primary}}
                />
                <View style={styles.bottomEndView}>
                  <Entypo
                    name="location-pin"
                    size={12}
                    color={Colors.primary}
                  />
                  <MyText title={selectedItem.location} lines={1} paragrapgh />
                </View>
              </View>
            </View>
          )}
          <View style={styles.btns}>
            <CustomButton
              title="Cancel"
              width="45%"
              bgClr="rgb(249, 229, 248)"
              txtStyle={{color: Colors.primary}}
              onClick={() => refRBSheet.current.close()}
            />
            <CustomButton
              title="Yes, Remove"
              width="45%"
              onClick={delFromFavourite}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default CustomItemScreen;
