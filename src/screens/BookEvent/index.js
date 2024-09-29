import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import CustomTextInput from '../../components/Input';
import DatePicker from 'react-native-date-picker';
import {Family} from '../../assets/FontFamily';
import DropdownComponent from '../../components/DropDown';
import {Colors} from '../../theme';
import {MyText} from '../../assets/Fonts';
import CustomButton from '../../components/Buttton';

const {width, height} = Dimensions.get('window');
const BookEvent = ({navigation}) => {
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
  const handleChangeNumeric = text => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(text)) {
      setValueNumeric(text);
      if (valueNummeric <= 100) setprice(13000);
      else if (valueNummeric <= 200) setprice(23000);
      else if (valueNummeric <= 500) setprice(32000);
      else setprice(50000);
    }
  };

  const hours = date.getHours();
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar onPress={() => navigation.goBack()} title={'Book Venue'} />
      <ScrollView
        style={{height: height - 200}}
        showsVerticalScrollIndicator={false}>
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
      <View style={{height: 1, backgroundColor: 'grey', marginBottom: 15}} />
      <CustomButton
        title={`Continue - PKR ${price}`}
        width="100%"
        txtSize={20}
        onClick={() => navigation.navigate('ContactInfo')}
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
