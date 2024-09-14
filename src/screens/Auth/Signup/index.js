import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Family} from '../../../components/family';
import CustomTextInput from '../../../components/customInput';
import {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import CustomRadioButton from '../../../components/customRadioButtons';
import CustomButton from '../../../components/customButton';
import {Colors} from '../../../components/colors';

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
          <Image
            source={require('../../../images/icon.png')}
            style={{width: 140, height: 140, marginLeft: -40}}
          />
          <Text style={styles.name}>VenueBot</Text>
        </View>
        <Text style={styles.txt}>Create your accout</Text>
        <Text style={styles.shortTxt}>
          Be part of us now and whatever will be here
        </Text>
        <CustomTextInput placeholder={'First Name'} leftImg={'user'} />
        <CustomTextInput placeholder={'Last Name'} leftImg={'add-user'} />
        <CustomTextInput
          placeholder={'Email'}
          keyboardType={'email-address'}
          leftImg={'mail'}
        />
        <CustomTextInput
          value={changed ? showingDate : 'Date of Birth'}
          rightImg={'calendar'}
          touch={true}
          onPress={() => setOpen(true)}
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
          <Text style={styles.gender}>Gender</Text>
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
        />
        <CustomTextInput
          keyboardType={'default'}
          leftImg={'lock'}
          placeholder={'Confirm Password'}
          widthInput={'82%'}
          rightImg={!show1 ? 'eye' : 'eye-with-line'}
          secure={!show1}
          rightClick={() => setShow1(!show1)}
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
          <Text style={{fontSize: 15, fontFamily: Family}}>
            Already have an accout?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btn}>Sign in</Text>
          </TouchableOpacity>
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
  name: {
    fontSize: 40,
    fontWeight: '600',
    color: 'black',
    marginLeft: -40,
    fontFamily: Family,
  },
  txt: {
    color: 'black',
    fontSize: 22,
    fontFamily: Family,
    fontWeight: '400',
  },
  shortTxt: {
    fontSize: 13,
    fontWeight: '300',
    width: '50%',
    textAlign: 'center',
    color: 'grey',
    marginVertical: 20,
    fontFamily: Family,
  },
  gender: {fontSize: 16, fontWeight: '300', fontFamily: Family},
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
