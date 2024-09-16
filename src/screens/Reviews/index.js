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
import {Colors} from '../../components/Colors/colors';
import {Family} from '../../components/FontFamily/family';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const {width, height} = Dimensions.get('screen');
const Reviews = ({navigation, route}) => {
  const [selectedStars, setSelectedStars] = useState('All');
  const reviews = route.params.reviews.slice().reverse();

  const filteredReviews =
    selectedStars === 'All'
      ? reviews
      : reviews.filter(review => review.stars === selectedStars);
  const ReviewItem = ({item}) => (
    <View style={{marginBottom: 10}}>
      <View style={[styles.review, {marginBottom: 7}]}>
        <View style={{...styles.review, gap: 10}}>
          <Image
            source={item.userDp}
            style={{width: 37, height: 37, borderRadius: 20}}
          />
          <Text style={{fontFamily: Family, fontSize: 16, fontWeight: '900'}}>
            {item.userName}
          </Text>
        </View>
        <View style={{...styles.review, gap: 10}}>
          <View style={styles.stars}>
            <Entypo name="star" size={11} color={Colors.primary} />
            <Text
              style={{fontFamily: Family, fontSize: 13, color: Colors.primary}}>
              {item.stars}
            </Text>
          </View>
          <TouchableOpacity style={styles.threeDots}>
            <Entypo name="dots-three-horizontal" size={12} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{fontSize: 14, fontFamily: Family}}>{item.review}</Text>
      <Text style={{fontFamily: Family, fontSize: 12}}>(6 months ago)</Text>
    </View>
  );
  const data = ['All', 1, 2, 3, 4, 5];
  const averageStars =
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;
  const renderItem = ({item}) => {
    const isSelected = item === selectedStars;
    return (
      <TouchableOpacity
        style={[styles.itm, isSelected && {backgroundColor: Colors.primary}]}
        onPress={() => setSelectedStars(item)}>
        <Entypo
          name="star"
          size={14}
          color={isSelected ? 'white' : Colors.primary}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: Family,
            color: isSelected ? 'white' : Colors.primary,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{paddingHorizontal: 13, marginBottom: 100}}>
      <View style={styles.topBar}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="arrow-long-left" size={25} color="black" />
          </TouchableOpacity>
          <Text style={{fontSize: 20, fontFamily: Family, fontWeight: 'bold'}}>
            {averageStars} ({reviews.length} reviews)
          </Text>
        </View>
        <TouchableOpacity style={styles.threeDots}>
          <Entypo name="dots-three-horizontal" size={15} color={'black'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderItem}
        key={item => item.toString()}
      />
      <FlatList
        data={filteredReviews}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ReviewItem item={item} />}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empty}>
              <Text style={styles.txt}>No Review with this Rating</Text>
              <FontAwesome6
                name="face-grin-squint-tears"
                size={30}
                color={Colors.primary}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itm: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 5,
    gap: 4,
    paddingHorizontal: 15,
    marginVertical: 14,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 25,
    paddingHorizontal: 12,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 30,
  },
  threeDots: {
    borderColor: 'black',
    borderRadius: 30,
    padding: 3,
    borderWidth: 1,
  },
  empty: {
    width: '100%',
    height: height - 150,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  txt: {
    fontSize: 20,
    fontFamily: Family,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
export default Reviews;
