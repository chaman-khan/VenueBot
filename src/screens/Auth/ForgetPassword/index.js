import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {Family} from '../../../assets/FontFamily';
import CustomTextInput from '../../../components/Input';
import CustomButton from '../../../components/Buttton';
import {Colors} from '../../../theme';
import {MyText} from '../../../assets/Fonts';
const {width, height} = Dimensions.get('screen');

const ForgetPassword = ({navigation}) => {
  return (
    <View style={{padding: 15, height: height, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <MyText txt={'Reset Password'} heading />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={20} />
        </TouchableOpacity>
      </View>
      <MyText
        txt={'Forget your password?'}
        style={{marginVertical: 50}}
        BigHeading
      />
      <MyText
        txt={
          'Enter your email address ad we will send you a link to reset your password'
        }
        paragrapgh
      />
      <CustomTextInput placeholder={'Email'} width={'100%'} />
      <CustomButton
        title={'Reset Password'}
        mBottom={50}
        bgClr={Colors.primary}
        txtSize={20}
        width="100%"
        marginVertical={20}
      />
      <View style={styles.bottom}>
        <MyText txt={"Don't have an accout?"} tiny />
        <MyText
          txt={'Sig up'}
          style={{color: Colors.primary}}
          onPress={() => navigation.navigate('Signup')}
        />
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
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 100,
  },
});
export default ForgetPassword;
