import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {MyText} from '../../assets/Fonts';
import CustomTextInput from '../../components/Input';
import DropdownComponent from '../../components/DropDown';
import CustomButton from '../../components/Buttton';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../theme';

const ContactInfo = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [checked, setChecked] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar onPress={() => navigation.goBack()} title={'Book Venue'} />
      <ScrollView>
        <MyText title={'Contact Information'} heading style={{marginTop: 20}} />
        <CustomTextInput placeholder={'First Name'} width={'100%'} />
        <CustomTextInput placeholder={'Last Name'} width={'100%'} />
        <CustomTextInput placeholder={'username'} width={'100%'} />
        <DropdownComponent
          data={['Male', 'Female', 'Trans']}
          onDropdownChange={setCategory}
          value={category}
          placeholder="Gender"
          width={'100%'}
        />
        <CustomTextInput
          width={'100%'}
          placeholder={'Email'}
          rightImg={'mail'}
        />
        <CustomTextInput placeholder={'Contact Number'} width={'100%'} />
        <CustomTextInput placeholder={'City'} width={'100%'} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 10,
          }}>
          <Text
            style={{...styles.box}}
            onPress={() => {
              setChecked(!checked);
              setBgColor(
                bgColor == 'transparent' ? Colors.primary : 'transparent',
              );
            }}>
            {checked && (
              <Entypo
                name="check"
                color="white"
                size={25}
                style={{backgroundColor: bgColor}}
              />
            )}
          </Text>
          <MyText
            title={'I accept all Terms and Connditions & Privacy Policy'}
            style={{color: 'grey', width: '80%'}}
          />
        </View>
        <CustomButton title="Continue" width="100%" marginVertical={20} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 3,
  },
});
export default ContactInfo;
