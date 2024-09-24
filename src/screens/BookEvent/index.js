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
  const [open, setOpen] = useState(true);
  const [changed, setChanged] = useState(false);
  const [category, setCategory] = useState('');
  const [valueNummeric, setValueNumeric] = useState('');
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
    }
  };

  const hours = date.getHours();
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar onPress={() => navigation.goBack()} title={'Book Venue'} />
      <ScrollView style={{height: height - 200}}>
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
            <MyText title={'Number of Seats'} heading />
            <CustomTextInput
              keyboardType={'numeric'}
              width={'43%'}
              onChangeText={handleChangeNumeric}
              value={valueNummeric}
            />
          </View>
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
      <CustomButton title={`Continue - PKR 20000`} width="100%" txtSize={20} />
    </View>
  );
};
const styles = StyleSheet.create({
  line: {
    width: '100%',
    gap: 20,
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
    marginVertical: 10,
  },
  category: {
    color: Colors.primary,
    width: '43%',
    alignSelf: 'flex-end',
  },
});
export default BookEvent;
