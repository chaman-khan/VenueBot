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
import auth from '@react-native-firebase/auth';

const Signup = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [changed, setChanged] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const options = ['Male', 'Female'];
  const {width, height} = Dimensions.get('screen');

  const showingDate = `${date.getDate().toString()}/${
    date.getMonth() + 1
  }/${date.getFullYear().toString()}`;

  const CreateUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        // navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    // navigation.navigate('Login');
  };
  return (
    <ScrollView style={{height: height}}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
          <Image source={Assets.logo} style={styles.img} />
          <MyText title="VenueBot" style={{letterSpacing: 5}} BigHeading />
        </View>
        <MyText
          title={'Create your accout'}
          style={{marginVertical: 10, fontWeight: '100'}}
          BigHeading
        />
        <MyText
          title={'Be part of us now and whatever will be here'}
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
          value={email}
          onChangeText={txt => setEmail(txt)}
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
          <MyText title={'Gender'} heading />
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
          value={password}
          onChangeText={txt => setPassword(txt)}
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
          onClick={CreateUser}
        />
        <View style={styles.bottom}>
          <MyText title={'Already have an accout?'} />
          <MyText
            title={'Sign in'}
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
  shortTxt: {
    width: '60%',
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
  bottom: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 100,
  },
});
export default Signup;
