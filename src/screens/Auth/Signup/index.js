import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Family} from '../../../assets/FontFamily';
import CustomTextInput from '../../../components/Input';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import CustomRadioButton from '../../../components/RadioButtton';
import CustomButton from '../../../components/Buttton';
import {Colors} from '../../../theme';
import {Assets} from '../../../assets/images';
import {MyText} from '../../../assets/Fonts';

const Signup = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [changed, setChanged] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Male', 'Female'];
  const {width, height} = Dimensions.get('screen');

  const showingDate = `${date.getDate().toString()}/${
    date.getMonth() + 1
  }/${date.getFullYear().toString()}`;
  return (
    <ScrollView style={{height: height}}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
          <Image source={Assets.logo} style={styles.img} />
          <MyText txt="VenueBot" style={{letterSpacing: 5}} BigHeading />
        </View>
        <MyText
          txt={'Create your accout'}
          style={{fontSize: 20, marginVertical: 10}}
        />
        <MyText
          txt={'Be part of us now and whatever will be here'}
          tiny
          style={styles.shortTxt}
        />
        <CustomTextInput
          placeholder={'First Name'}
          leftImg={'user'}
          leftColor={'black'}
          lftChkd
        />
        <CustomTextInput
          placeholder={'Last Name'}
          leftImg={'add-user'}
          leftColor={'black'}
          lftChkd
        />
        <CustomTextInput
          placeholder={'Email'}
          keyboardType={'email-address'}
          leftImg={'mail'}
          leftColor={'black'}
          lftChkd
        />
        <CustomTextInput
          value={changed ? showingDate : 'Date of Birth'}
          rightImg={'calendar'}
          touch={true}
          onPress={() => setOpen(true)}
          widthInput={'90%'}
          leftImg={'check'}
          leftColor={'green'}
          lftChkd={changed}
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
          mode="date"
        />
        <View style={styles.radio}>
          <MyText txt={'Gender'} heading />
          <CustomRadioButton
            options={options}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
        </View>
        <View style={{flexDirection: 'row', width: '90%', gap: 10}}>
          <CustomTextInput width={'30%'} value={'PK  +92'} touch={true} />
          <CustomTextInput placeholder={'Mobile'} width={'67%'} />
        </View>
        <CustomTextInput
          keyboardType={'default'}
          leftImg={'lock'}
          placeholder={'Password'}
          widthInput={'82%'}
          rightImg={!show ? 'eye' : 'eye-with-line'}
          secure={!show}
          rightClick={() => setShow(!show)}
          leftColor={'black'}
          lftChkd
        />
        <CustomTextInput
          keyboardType={'default'}
          leftImg={'lock'}
          placeholder={'Confirm Password'}
          widthInput={'82%'}
          rightImg={!show1 ? 'eye' : 'eye-with-line'}
          secure={!show1}
          rightClick={() => setShow1(!show1)}
          leftColor={'black'}
          lftChkd
        />
        <CustomButton
          title={'Sign up'}
          bgClr={Colors.primary}
          width={'90%'}
          txtSize={20}
          marginVertical={10}
          mBottom={30}
          onClick={() => navigation.navigate('Login')}
        />
        <View style={styles.bottom}>
          <MyText txt={'Already have an accout?'} />
          <MyText
            txt={'Sign in'}
            style={{color: Colors.primary}}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  name: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    fontFamily: Family,
    letterSpacing: 5,
  },
  txt: {
    color: 'black',
    fontSize: 20,
    fontFamily: Family,
    marginVertical: 10,
    letterSpacing: 0.2,
  },
  shortTxt: {
    width: '50%',
    textAlign: 'center',
    color: 'grey',
    marginVertical: 20,
  },
  radio: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  btn: {color: Colors.primary, fontSize: 15, fontFamily: Family},
  bottom: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 100,
  },
});
export default Signup;
