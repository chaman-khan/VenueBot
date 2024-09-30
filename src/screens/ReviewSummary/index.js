import React, {createContext, useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {MyText} from '../../assets/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {elevation} from '../../theme/appStyles';
import {Colors} from '../../theme';
import CustomButton from '../../components/Buttton';

const ReviewSummary = ({navigation, route}) => {
  // const data = route.params;
  // console.log(data);

  const data = {
    item: {
      contact: '03470549301',
      dateToSend: 'Monday, Sep 30 . 5:34 AM',
      firstName: 'Chamman',
      hImage: {
        uri: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/278505452.jpg?k=742cd54927b2876c0e5d0feb1074fa764ecec7462c518554b5c900449c6d6914&o=&hp=1',
      },
      hLocation: 'Islamabad, Pakistan',
      hName: 'Pearl Continental Hotel',
      lastName: 'Khan',
      mail: 'chaman.devv@gmail.com',
      price: 32000,
      userName: 'chaman',
      seats: 345,
      category: 'Wedding',
      gender: 'male',
      hManager: 'John',
      city: 'Islamabad',
    },

    selectedOption: {
      img: 'cc-mastercard',
      key: 1727575603579,
      secure: true,
      title: '5454 5454 4544 5455',
    },
  };

  const formatTitle = (title, secure) => {
    if (secure) {
      const visiblePart = title.slice(-4);
      const hiddenPart = title.slice(0, -4).replace(/\S/g, '•');
      return `${hiddenPart}${visiblePart}`;
    } else return title;
  };

  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar title={'Review Summary'} onPress={() => navigation.goBack()} />
      <ScrollView style={{flexGrow: 1}}>
        <View style={styles.item}>
          <Image source={data.item.hImage} style={styles.img} />
          <View style={{gap: 6, width: '60%'}}>
            <MyText title={data.item.hName} heading lines={1} />
            <MyText
              title={data.item.dateToSend}
              paragrapgh
              style={{color: Colors.primary}}
            />
            <View style={styles.right}>
              <View style={styles.location}>
                <Entypo name="location-pin" size={12} color={Colors.primary} />

                <MyText title={data.item.hLocation} lines={1} paragrapgh />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText title={'Name'} style={{color: 'grey'}} />
            <MyText title={`${data.item.firstName} ${data.item.lastName}`} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Phone'} style={{color: 'grey'}} />
            <MyText title={data.item.contact} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Email'} style={{color: 'grey'}} />
            <MyText title={data.item.mail} />
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText
              title={`${data.item.seats} seats (${data.item.category})`}
              style={{color: 'grey'}}
            />
            <MyText title={`RS ${data.item.price}/-`} />
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
            <MyText title={`RS ${data.item.price + 500}/-`} />
          </View>
        </View>
        <View
          style={{...styles.view, flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
            <FontAwesome
              name={data.selectedOption.img}
              color={Colors.primary}
              size={30}
            />
            <MyText
              title={formatTitle(
                data.selectedOption.title,
                data.selectedOption.secure,
              )}
            />
          </View>
          <MyText
            title={'Change'}
            style={{color: Colors.primary}}
            onPress={() => navigation.navigate('Payments')}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Continue"
        width="100%"
        txtSize={20}
        marginVertical={10}
        onClick={() => navigation.navigate('EnterYourPin', (props = {data}))}
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
