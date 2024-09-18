import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import CustomTextInput from '../../components/Input';
import DatePicker from 'react-native-date-picker';
import {Family} from '../../assets/FontFamily';
import DropdownComponent from '../../components/DropDown';
import {Colors} from '../../theme';
import {MyText} from '../../assets/Fonts';
const BookEvent = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [category, setCategory] = useState('');
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
  console.log('category', category);

  const hours = date.getHours();
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar onPress={() => navigation.goBack()} title={'Book Venue'} />
      <ScrollView>
        <View>
          <MyText
            txt={'Select your Date and Time for your Booking'}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <MyText txt={'Type of Event'} />
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
              <MyText
                txt={category}
                paragrapgh
                style={{
                  color: Colors.primary,
                  width: '80%',
                  textAlign: 'right',
                }}
              />
            )}
          {changed && (
            <View style={styles.line}>
              <MyText txt={'Your Arrival Time:'} heading />
              <View style={styles.box}>
                <MyText
                  txt={`${
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
});
export default BookEvent;
