import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {MyText} from '../../assets/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../theme';
import CustomButton from '../../components/Buttton';
import {useDispatch, useSelector} from 'react-redux';
import {backdatafromCurrentBooking} from '../../Features/dataSlice';

const ReviewSummary = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.currentBooking);

  const formatTitle = (title, secure) => {
    if (secure) {
      const visiblePart = title.slice(-4);
      const hiddenPart = title.slice(0, -4).replace(/\S/g, '•');
      return `${hiddenPart}${visiblePart}`;
    } else return title;
  };

  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar
        title={'Review Summary'}
        onPress={() => {
          navigation.goBack();
          dispatch(backdatafromCurrentBooking());
        }}
      />
      <ScrollView style={{flexGrow: 1}}>
        <View style={styles.item}>
          <Image source={data[0]?.images[0]} style={styles.img} />
          <View style={{gap: 6, width: '60%'}}>
            <MyText title={data[0]?.name} heading lines={1} />
            <MyText
              title={data[1]?.dateToSend}
              paragrapgh
              style={{color: Colors.primary}}
            />
            <View style={styles.right}>
              <View style={styles.location}>
                <Entypo name="location-pin" size={12} color={Colors.primary} />

                <MyText title={data[0]?.location} lines={1} paragrapgh />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText title={'Name'} style={{color: 'grey'}} />
            <MyText title={`${data[2]?.firstName} ${data[2]?.lastName}`} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Phone'} style={{color: 'grey'}} />
            <MyText title={data[2]?.contact} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Email'} style={{color: 'grey'}} />
            <MyText title={data[2]?.mail} />
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText
              title={`${data[1]?.seats} seats (${data[1]?.category})`}
              style={{color: 'grey'}}
            />
            <MyText title={`RS ${data[1]?.price}/-`} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Tax'} style={{color: 'grey'}} />
            <MyText title={'RS 500/-'} />
          </View>
          <MyText
            title={'MoreOver, price can be disgussed with Ower chat'}
            tiny
            style={{color: Colors.primary, textAlign: 'center'}}
          />
          <View style={styles.line} />
          <View style={styles.inner}>
            <MyText title={'Total'} style={{color: 'grey'}} />
            <MyText title={`RS ${data[1]?.price + 500}/-`} />
          </View>
        </View>
        <View
          style={{...styles.view, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <FontAwesome name={data[3]?.img} color={Colors.primary} size={30} />
            <MyText title={formatTitle(data[3]?.title, data[3]?.secure)} />
          </View>
          <MyText
            title={'Change'}
            style={{color: Colors.primary}}
            onPress={() => {
              navigation.navigate('Payments');
              dispatch(backdatafromCurrentBooking());
            }}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Continue"
        width="100%"
        txtSize={20}
        marginVertical={10}
        onClick={() => navigation.navigate('EnterYourPin')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 30,
    gap: 6,
    // ...elevation,
  },
  img: {
    width: '35%',
    height: 110,
    borderRadius: 20,
  },
  location: {
    flexDirection: 'row',
    gap: 5,
    width: '60%',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 30,
    gap: 13,
    justifyContent: 'space-between',
    // ...elevation,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
  },
});
export default ReviewSummary;
