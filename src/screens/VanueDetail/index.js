import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  PermissionsAndroid,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Family} from '../../assets/FontFamily';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavourite} from '../../Features/hotelsSlice';
import CustomButton from '../../components/Buttton';
import MapView, {Marker} from 'react-native-maps';
import {getDistance} from 'geolib';
import Geolocation from '@react-native-community/geolocation';
import {Colors} from '../../theme';
import {MyText} from '../../assets/Fonts';
const {width, height} = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const VanueDetail = ({navigation, route}) => {
  const itemKey = route.params.itemKey;
  const hotels = useSelector(state => state.hotels);
  const pan = useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [distance, setDistance] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const reviews = [
    {
      id: 1,
      review:
        'The Luxus Grand Hotel provided an exceptional experience for our corporate event. The staff was incredibly attentive, and the facilities were top-notch. Highly recommend for any professional gathering!',
      stars: 4,
      userName: 'John Doe',
      userDp: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5epHzce-zJe-8dJe8GPHZcJdwp4Z0ZRd4CA&s',
      },
    },
    {
      id: 2,
      review:
        'Our wedding reception at The Residency Hotel was nothing short of magical. The elegant decor and personalized service made our special day unforgettable. The team went above and beyond to ensure everything was perfect.',
      stars: 5,
      userName: 'Jane Smith',
      userDp: {
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zNPkbYQDrxhWSf3Ow_p-izi2LbCiYmd0nA&s',
      },
    },
    {
      id: 3,
      review:
        'We hosted our annual conference at the Pearl Continental Hotel, and it was a huge success. The state-of-the-art conference center and the professional staff made the event seamless. The ambiance and amenities were outstanding.',
      stars: 4,
      userName: 'Michael Brown',
      userDp: {
        uri: 'https://media.gettyimages.com/id/585838010/photo/businesswoman-standing-in-banquet-hall.jpg?s=612x612&w=gi&k=20&c=W2ZHohqNRkUmI8c5Qsox3vFOc_zqNn2w7S1jL-9LUmY=',
      },
    },
    {
      id: 4,
      review:
        'EventUp made it easy to find and book the perfect venue for our party. The detailed information and reviews helped us choose a location that fit our needs perfectly. The booking process was smooth and hassle-free.',
      stars: 3,
      userName: 'Emily Davis',
      userDp: {
        uri: 'https://media.licdn.com/dms/image/C4E03AQGqfAtqMq8YHA/profile-displayphoto-shrink_200_200/0/1624974620746?e=2147483647&v=beta&t=1NqKxYCO87fm3i2aKShXugkUSj7ar3JLIa3kxrU5fuc',
      },
    },
    {
      id: 5,
      review:
        'Finding a wedding venue through The Knot was a breeze. The platform provided all the necessary details and reviews, making it easy to compare options. We found a beautiful venue that fit our budget and style perfectly.',
      stars: 2,
      userName: 'Chris Johnson',
      userDp: {
        uri: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/5a/38/ff/the-shalimar-hotel.jpg',
      },
    },
  ];

  const toggleText = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTextToShow = (text, id) => {
    const words = text.split(' ');
    if (expandedItems[id] || words.length <= 10) {
      return text;
    }
    return words.slice(0, 10).join(' ') + '...';
  };
  const averageStars =
    reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length;

  const dispatch = useDispatch();

  const item = hotels.find(hotel => hotel.key === itemKey);
  const ReviewItem = ({item = reviews[reviews.length - 1]}) => (
    <View style={{marginBottom: 10}}>
      <View style={[styles.review, {marginBottom: 7}]}>
        <View style={{...styles.review, gap: 10}}>
          <Image
            source={item.userDp}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
          <MyText txt={item.userName} heading />
        </View>
        <View style={{...styles.review, gap: 10}}>
          <View style={styles.stars}>
            <Entypo name="star" size={12} color={Colors.primary} />
            <MyText txt={item.stars} MyText />
          </View>
          <TouchableOpacity style={styles.threeDots}>
            <Entypo name="dots-three-horizontal" size={15} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <MyText
        txt={getTextToShow(item.review, item.id)}
        onPress={() => toggleText(item.id)}
      />
    </View>
  );

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
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          const targetLocation = destination;
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
  const origin = {latitude: latitude, longitude: longitude};
  const destination = {latitude: item.latitude, longitude: item.longitude};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyA-4CW3RJxhVCSTrImtIdOJ-4k9zXMZQF4';
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
        title: 'VenueBot',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
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

          <TouchableOpacity onPress={onShare}>
            <Entypo name="share" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <MyText txt={item.name} BigHeading />
        <View style={styles.line} />

        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <View style={styles.locBG}>
            <Entypo name="location" size={20} color={Colors.primary} />
          </View>
          <View style={{gap: 7}}>
            <MyText txt={item.location} heading />
            <MyText style={{color: 'rgba(0,0,0,0.7)'}} txt={item.location} />
            <TouchableOpacity
              style={styles.design}
              onPress={() =>
                navigation.navigate(
                  'Location',
                  (props = {
                    origin,
                    destination,
                    distance,
                  }),
                )
              }>
              <Entypo name="location" size={12} color="white" />

              <MyText
                txt="See Location on Maps"
                tiny
                style={{color: 'white'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.second}>
          <View style={styles.locBG}>
            <Entypo name="ticket" size={20} color={Colors.primary} />
          </View>
          <View style={{gap: 7}}>
            <MyText txt="PKR 250K - 400k" heading />
            <MyText
              txt="venue Charges depends on Package"
              style={{color: 'rgba(0,0,0,0.7)'}}
            />
          </View>
        </View>

        <View style={styles.managerContainer}>
          <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <Image
              source={item.managerDp}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
            <View>
              <MyText txt={`${item.managerName} Name`} heading />
              <MyText txt="manager" paragrapgh />
            </View>
          </View>
          <TouchableOpacity style={styles.chatBtn}>
            <MyText txt={'Chat'} style={{color: Colors.primary}} />
          </TouchableOpacity>
        </View>
        <MyText txt="About Venue:" style={{marginVertical: 10}} heading />
        <MyText
          txt="it is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book"
          MyText
        />
        <MyText txt="Availability:" style={{marginVertical: 10}} heading />
        <MyText txt={item.availability} MyText />
        <View style={styles.line} />
        <MyText txt="Location" style={{marginVertical: 10}} heading />
        <View style={styles.loc}>
          <Entypo name="location-pin" color={Colors.primary} size={20} />

          <MyText
            txt={`${
              distance !== null ? `${distance} meters` : 'Calculating...'
            } away from your location`}
            MyText
          />
        </View>

        <MapView
          style={{width: '100%', height: 250, borderRadius: 15}}
          provider="google"
          key={'AIzaSyA-4CW3RJxhVCSTrImtIdOJ-4k9zXMZQF4'}
          initialRegion={{
            latitude: destination.latitude,
            longitude: destination.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          mapType="standard"
          userInterfaceStyle="light"
          showsUserLocation={true}
          userLocationUpdateInterval={5000}
          ref={ref => {
            this.mapView = ref;
          }}>
          <Marker draggable coordinate={destination} title="Destiation" />
        </MapView>
        <View style={styles.review}>
          <View style={{...styles.review, gap: 10}}>
            <Entypo name="star" color="#f18e1e" size={25} />
            <MyText
              txt={`${averageStars} (${reviews.length} reviews)`}
              heading
            />
          </View>
          <MyText
            style={{color: Colors.primary}}
            txt="See All"
            paragrapgh
            onPress={() => navigation.navigate('Reviews', (props = {reviews}))}
          />
        </View>
        <ReviewItem />

        <CustomButton
          title="Booking Now"
          bgClr={Colors.primary}
          txtSize={20}
          width="100%"
          onClick={() => navigation.navigate('BookEvent')}
          mBottom={20}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  topRow: {
    position: 'absolute',
    paddingTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scroll: {
    width: '100%',
    paddingHorizontal: '5%',
    height: height - 350,
    alignSelf: 'center',
    marginTop: 10,
  },
  line: {
    height: 0.8,
    backgroundColor: 'rgba(0,0,0,0.1)',
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
  design: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    borderRadius: 40,
  },
  locBG: {
    padding: 15,
    backgroundColor: 'rgba(103, 27, 99, 0.1)',
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  second: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 13,
    marginBottom: 20,
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
  loc: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
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
  chatBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
});
export default VanueDetail;
