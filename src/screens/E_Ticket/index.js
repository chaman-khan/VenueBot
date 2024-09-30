import React from 'react';
import {
  Clipboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from '../../components/TopBar';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {MyText} from '../../assets/Fonts';
import {Colors} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/Buttton';

const E_Ticket = ({navigation, route}) => {
  const data = route.params.data;
  const orderId = Date.now().toString();
  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar title={'E-Ticket'} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Barcode
          value={Date.now().toString()}
          height={80}
          format="CODE128"
          width={2}
          lineColor="black"
          text={Date.now().toString()}
          style={styles.barCode}
        />
        <View style={styles.view}>
          <MyText title={'Venue'} />
          <MyText title={data.data.item.hName} heading />
          <MyText title={'Date and Hour'} />
          <MyText title={data.data.item.dateToSend} heading />
          <MyText title={'Venue Locations'} />
          <MyText title={data.data.item.hLocation} heading />
          <MyText title={'Venue Manager'} />
          <MyText title={`${data.data.item.hManager} Name`} heading />
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText title={'Full Name'} style={{color: 'grey'}} />
            <MyText
              title={`${data.data.item.firstName} ${data.data.item.lastName}`}
            />
          </View>
          <View style={styles.inner}>
            <MyText title={'NickName'} style={{color: 'grey'}} />
            <MyText title={data.data.item.userName} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Gender'} style={{color: 'grey'}} />
            <MyText title={data.data.item.gender} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Date Of Birth'} style={{color: 'grey'}} />
            <MyText title={'12/09/2001'} />
          </View>
          <View style={styles.inner}>
            <MyText title={'City'} style={{color: 'grey'}} />
            <MyText title={data.data.item.city} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Phone'} style={{color: 'grey'}} />
            <MyText title={data.data.item.contact} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Email'} style={{color: 'grey'}} />
            <MyText title={data.data.item.mail} />
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText
              title={`${data.data.item.seats} seats (${data.data.item.category})`}
              style={{color: 'grey'}}
            />
            <MyText title={`RS ${data.data.item.price}/-`} />
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
            <MyText title={`RS ${data.data.item.price + 500}/-`} />
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.inner}>
            <MyText title={'Paymentt Methods'} style={{color: 'grey'}} />
            <MyText title={'MasterCard'} />
          </View>
          <View style={styles.inner}>
            <MyText title={'Order ID'} style={{color: 'grey'}} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <MyText title={orderId} />
              <TouchableOpacity onPress={() => Clipboard.setString(orderId)}>
                <Feather name="copy" size={15} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inner}>
            <MyText title={'Status'} style={{color: 'grey'}} />
            <MyText
              title={'paid'}
              style={{
                color: Colors.primary,
                borderColor: Colors.primary,
                borderWidth: 1,
                padding: 2,
                paddingHorizontal: 7,
              }}
              tiny
            />
          </View>
        </View>
      </ScrollView>
      <CustomButton
        title="Download E-Ticket"
        width="100%"
        marginVertical={10}
        txtSize={20}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  barCode: {
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  view: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    gap: 13,
    justifyContent: 'space-between',
    // ...elevation,
  },
  inner: {flexDirection: 'row', justifyContent: 'space-between'},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
  },
});
export default E_Ticket;
