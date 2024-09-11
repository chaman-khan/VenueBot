import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Family} from '../../components/family';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../components/colors';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavourite} from '../../Features/hotelsSlice';
import CustomButton from '../../components/customButton';
import MapView, {Marker} from 'react-native-maps';
import GeoLocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
const VanueDetail = ({navigation, route}) => {
  const itemKey = route.params.itemKey;
  const hotels = useSelector(state => state.hotels);
  const pan = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [distance, setDistance] = useState(null);
  const {width, height} = Dimensions.get('screen');

  const dispatch = useDispatch();

  const item = hotels.find(hotel => hotel.key === itemKey);
  const ReviewItem = ({review}) => (
    <View style={{marginBottom: 10}}>
      <Text style={styles.reviewText}>{review}</Text>
      <View style={{width: '100%', height: 1, backgroundColor: 'lightgrey'}} />
    </View>
  );
  const StarRating = ({rating}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Entypo
          key={i}
          name={i <= rating ? 'star' : 'star-outlined'}
          size={30}
          color={i <= rating ? '#FFD700' : '#CCCCCC'}
        />,
      );
    }

    return (
      <View style={styles.starContainer}>
        {stars}
        <Text style={{marginLeft: 10}}>({item.reviews.length})</Text>
      </View>
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, {dx}) => {
        if (dx > 120) {
          // Swipe right
          setNextIndex(
            (currentIndex - 1 + item.images.length) % item.images.length,
          );
          Animated.spring(pan, {
            toValue: {x: 300, y: 0},
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex(
              prevIndex =>
                (prevIndex - 1 + item.images.length) % item.images.length,
            );
            pan.setValue({x: 0, y: 0});
            setNextIndex(null);
          });
        } else if (dx < -120) {
          // Swipe left
          setNextIndex((currentIndex + 1) % item.images.length);
          Animated.spring(pan, {
            toValue: {x: -300, y: 0},
            useNativeDriver: false,
          }).start(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % item.images.length);
            pan.setValue({x: 0, y: 0});
            setNextIndex(null);
          });
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      getCurrentLocation();
    };

    const getCurrentLocation = () => {
      GeoLocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const targetLocation = {latitude: 31.47405, longitude: 74.32922};
          const distance = getDistance({latitude, longitude}, targetLocation);
          setDistance(distance);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
  }, []);
  return (
    <View>
      <View style={styles.imageContainer}>
        {nextIndex !== null && (
          <Animated.Image
            source={item.images[nextIndex]}
            style={[
              styles.image,
              {
                position: 'absolute',
                left: pan.x.interpolate({
                  inputRange: [-300, 0, 300],
                  outputRange: [300, 0, -300],
                }),
              },
            ]}
          />
        )}
        <Animated.Image
          source={item.images[currentIndex]}
          style={[
            styles.image,
            {
              transform: [{translateX: pan.x}],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="arrow-long-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 20}}>
          <TouchableOpacity onPress={() => dispatch(toggleFavourite(item.key))}>
            <Entypo
              name={item.favourite ? 'heart' : 'heart-outlined'}
              size={30}
              color="white"
            />
          </TouchableOpacity>

          <Entypo name="share" size={30} color="white" />
        </View>
      </View>
      <ScrollView
        style={{
          width: '100%',
          paddingHorizontal: '5%',
          height: height - 350,
          alignSelf: 'center',
        }}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.line} />

        <View style={styles.managerContainer}>
          <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <Image
              source={item.managerDp}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View>
              <Text
                style={{fontFamily: Family, fontWeight: '600', fontSize: 20}}>
                {item.managerName} Name
              </Text>
              <Text style={{fontFamily: Family, fontSize: 12}}>Manager</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.chatBtn}>
            <Text style={{color: Colors.primary, fontFamily: Family}}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Availability:</Text>
        <Text style={{fontFamily: Family}}>{item.availability}</Text>
        <View style={styles.line} />
        <Text style={styles.heading}>Reviews:</Text>
        <StarRating rating={item.stars} />
        <MapView
          style={{width: '100%', height: 250}}
          provider="google"
          // key={'AIzaSyDdj-1beJLCFhn_O98ugRZV-7ytcpPZ04Y'}
          initialRegion={{
            latitude: 31.47405,
            longitude: 74.32922,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable
            coordinate={{latitude: 31.47405, longitude: 74.32922}}
            title="hello"
          />
        </MapView>
        <FlatList
          data={item.reviews}
          renderItem={({item}) => <ReviewItem review={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text>
          distance{distance !== null ? `${distance} meters` : 'Calculating...'}
        </Text>
        <CustomButton title="Booking Now" bgClr={Colors.primary} txtSize={20} />
      </ScrollView>
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
  topRow: {
    position: 'absolute',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  reviewText: {
    fontSize: 16,
    fontFamily: Family,
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  managerContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
});
export default VanueDetail;
