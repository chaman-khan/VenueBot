import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Family} from '../../../assets/FontFamily';
import CustomTextInput from '../../../components/Input';
import CustomButton from '../../../components/Buttton';
import {Colors} from '../../../theme';
const {width, height} = Dimensions.get('screen');

const ForgetPassword = ({navigation}) => {
  return (
    <View style={{padding: 15, height: height, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, fontFamily: Family}}>Reset Password</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.topTxt}>Forget your password?</Text>
      <Text style={{fontSize: 13, fontWeight: '300', fontFamily: Family}}>
        Enter your email address ad we will send you a link to reset your
        password
      </Text>
      <CustomTextInput placeholder={'Email'} width={'100%'} />
      <CustomButton
        title={'Reset Password'}
        mBottom={50}
        bgClr={Colors.primary}
        txtSize={25}
        marginVertical={20}
      />
      <View style={styles.bottom}>
        <Text style={{fontSize: 15, fontFamily: Family}}>
          Don't have an accout?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btn}>Sig up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topTxt: {
    fontSize: 22,
    color: 'black',
    fontFamily: Family,
    fontWeight: '600',
    marginVertical: 50,
  },
  bottom: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 100,
  },
  btn: {color: Colors.primary, fontSize: 15, fontFamily: Family},
});
export default ForgetPassword;
