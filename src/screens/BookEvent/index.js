import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import TopBar from '../../components/TopBar';
import CustomTextInput from '../../components/Input';
import DatePicker from 'react-native-date-picker';
import DropdownComponent from '../../components/DropDown';
import {Colors} from '../../theme';
import {MyText} from '../../assets/Fonts';
import CustomButton from '../../components/Buttton';
import {useDispatch} from 'react-redux';
import {
  addDataToCurrentBooking,
  backdatafromCurrentBooking,
} from '../../Features/dataSlice';

const {width, height} = Dimensions.get('window');
const BookEvent = ({navigation}) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [category, setCategory] = useState('');
  const [valueNummeric, setValueNumeric] = useState('');
  const [price, setprice] = useState(0);
  const showingDate = `${date.getDate().toString()}/${
    date.getMonth() + 1
  }/${date.getFullYear().toString()}`;
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const handleChangeNumeric = text => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text)) {
      setValueNumeric(text);
      if (valueNummeric > 500) setprice(120000);
      else if (valueNummeric > 200) setprice(67000);
      else if (valueNummeric > 100) setprice(44500);
      else setprice(20000);
    }
  };

  const hours = date.getHours();
  const dateToSend = `${daysOfWeek[date.getDay()]}, ${
    monthsOfYear[date.getMonth()]
  } ${date.getDate().toString()} . ${
    hours < 12 ? hours : hours - 12
  }:${date.getMinutes()} ${hours < 12 ? 'AM' : 'PM'}`;
  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar
        onPress={() => {
          navigation.goBack();
          dispatch(backdatafromCurrentBooking());
        }}
        title={'Book Venue'}
      />
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <View>
          <MyText
            title={'Select your Date and Time for your Booking'}
            heading
            style={{marginTop: 20}}
          />
          <CustomTextInput
            value={changed ? showingDate : 'Booking Date and Time'}
            leftImg={'check'}
            leftColor={'green'}
            rightImg={'calendar'}
            touch={true}
            onPress={() => setOpen(true)}
            widthInput={'90%'}
            lftChkd={changed}
            width={'100%'}
          />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setChanged(true);
            }}
            onCancel={() => setOpen(false)}
            mode="datetime"
            title={'Select Date and Time for your Events'}
            buttonColor="red"
          />
          <View style={styles.types}>
            <MyText title={'Type of Event'} heading />
            <View>
              <DropdownComponent
                data={['Wedding', 'Conference', 'Party', 'Other']}
                onDropdownChange={setCategory}
                value={category}
                placeholder="Select"
              />
            </View>
          </View>

          {category !== 'Wedding' &&
            category !== 'Conference' &&
            category !== 'Party' && (
              <MyText title={category} style={styles.category} />
            )}
          <View style={styles.types}>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                // alignItems: 'center',
              }}>
              <MyText title={'Max Time Needed'} heading />
              <MyText
                title={'(in hours)'}
                tiny
                style={{alignSelf: 'flex-end'}}
              />
            </View>

            <CustomTextInput
              placeholder={'Number of hours'}
              keyboardType={'numeric'}
              width={'43%'}
            />
          </View>
          <View style={styles.types}>
            <MyText title={'Number of Seats'} heading />
            <CustomTextInput
              placeholder={'Max Number of Seats'}
              keyboardType={'numeric'}
              width={'43%'}
              onChangeText={handleChangeNumeric}
              value={valueNummeric}
            />
          </View>
          <MyText title={'Special Instructions: '} heading />
          <CustomTextInput width={'100%'} maxHeight={150} full />

          {changed && (
            <View style={styles.line}>
              <MyText title={'Your Arrival Time:'} heading />
              <View style={styles.box}>
                <MyText
                  title={`${
                    hours < 12 ? hours : hours - 12
                  }:${date.getMinutes()} ${hours < 12 ? 'AM' : 'PM'} ${
                    daysOfWeek[date.getDay()]
                  }`}
                  BigHeading
                  style={{color: 'white', textAlign: 'center'}}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{height: 1, backgroundColor: 'grey', marginVertical: 15}} />
      <CustomButton
        title={`Continue - PKR ${price}`}
        width="100%"
        txtSize={20}
        mBottom={10}
        onClick={() => {
          navigation.navigate('ContactInfo');
          dispatch(
            addDataToCurrentBooking({
              dateToSend,
              category,
              seats: valueNummeric,
              price,
            }),
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    width: '100%',
    gap: 20,
    marginBottom: 20,
  },
  box: {
    width: '70%',
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    color: Colors.primary,
    width: '43%',
    alignSelf: 'flex-end',
  },
});
export default BookEvent;
