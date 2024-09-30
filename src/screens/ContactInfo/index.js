import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from '../../components/TopBar';
import {MyText} from '../../assets/Fonts';
import CustomTextInput from '../../components/Input';
import DropdownComponent from '../../components/DropDown';
import CustomButton from '../../components/Buttton';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../theme';

const ContactInfo = ({navigation, route}) => {
  const {
    hImage,
    hName,
    hLocation,
    hManager,
    dateToSend,
    price,
    seats,
    category,
  } = route.params;

  const [firstName, setFirstName] = useState('Chamman');
  const [lastName, setLastName] = useState('Khan');
  const [userName, setUserName] = useState('chaman');
  const [mail, setMail] = useState('chaman.devv@gmail.com');
  const [contact, setContact] = useState('03470549301');
  const [city, setCity] = useState('Islamabad');
  const [gender, setGender] = useState('');
  const [checked, setChecked] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');

  const item = {
    hImage,
    hName,
    hLocation,
    hManager,
    dateToSend,
    price,
    firstName,
    lastName,
    userName,
    mail,
    contact,
    city,
    seats,
    category,
    gender,
  };

  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar onPress={() => navigation.goBack()} title={'Book Venue'} />
      <ScrollView style={{flexGrow: 1}}>
        <MyText title={'Contact Information'} heading style={{marginTop: 20}} />
        <CustomTextInput
          placeholder={'First Name'}
          width={'100%'}
          value={firstName}
          onChangeText={txt => setFirstName(txt)}
        />
        <CustomTextInput
          placeholder={'Last Name'}
          width={'100%'}
          value={lastName}
          onChangeText={txt => setLastName(txt)}
        />
        <CustomTextInput
          placeholder={'username'}
          width={'100%'}
          value={userName}
          onChangeText={txt => setUserName(txt)}
        />
        <DropdownComponent
          data={['Male', 'Female', 'Trans']}
          onDropdownChange={setGender}
          value={gender}
          placeholder="Gender"
          width={'100%'}
        />
        <CustomTextInput
          width={'100%'}
          placeholder={'Email'}
          rightImg={'mail'}
          value={mail}
          onChangeText={txt => setMail(txt)}
        />
        <CustomTextInput
          placeholder={'Contact Number'}
          width={'100%'}
          value={contact}
          onChangeText={txt => setContact(txt)}
        />
        <CustomTextInput
          placeholder={'City'}
          width={'100%'}
          value={city}
          onChangeText={txt => setCity(txt)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={{...styles.box, backgroundColor: bgColor}}
            onPress={() => {
              setChecked(!checked);
              setBgColor(
                bgColor == 'transparent' ? Colors.primary : 'transparent',
              );
            }}>
            {checked && <Entypo name="check" color="white" size={15} />}
          </TouchableOpacity>
          <MyText
            title={'I accept all Terms and Connditions & Privacy Policy'}
            style={{color: 'grey', width: '80%'}}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Continue"
        width="100%"
        txtSize={20}
        marginVertical={20}
        onClick={() => navigation.navigate('Payments', (props = {item}))}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: 25,
    height: 25,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ContactInfo;
