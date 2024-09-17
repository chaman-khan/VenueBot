import React, {useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Family} from '../../../assets/FontFamily';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../components/Input';
import CustomButton from '../../../components/Buttton';
import {Colors} from '../../../theme';
import {Assets} from '../../../assets/images';
import {MyText} from '../../../assets/Fonts';
const Login = ({navigation}) => {
  const [show, setShow] = useState(true);
  const {width, height} = Dimensions.get('screen');
  return (
    <ScrollView style={{height: height}}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 50,
          paddingHorizontal: '5%',
        }}>
        <View style={styles.header}>
          <Image source={Assets.logo} style={styles.img} />
          <MyText txt="VenueBot" style={{letterSpacing: 5}} BigHeading />
        </View>
        <MyText
          txt="Sign in to your account"
          style={{fontSize: 20, marginVertical: 10}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MyText txt="Don't have account?  " tiny />
          <MyText
            txt="Sign up"
            style={{color: Colors.primary, fontSize: 16}}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
        <View style={styles.googlettxt}>
          <MyText txt="Sign in with" />
          <CustomButton
            buttonStyle={styles.googleContaier}
            width="30%"
            txtStyle={{color: 'black'}}
            icon={Assets.google}
            iconSize={20}
            title="Google"
          />
        </View>
        <View style={styles.or}>
          <View style={{flex: 1, height: 0.5, backgroundColor: 'black'}} />
          <MyText txt="or" />
          <View style={{flex: 1, height: 0.5, backgroundColor: 'black'}} />
        </View>
        <CustomTextInput
          keyboardType={'email-address'}
          leftImg={'mail'}
          placeholder={'Email'}
          leftColor={'black'}
          lftChkd
          width={'100%'}
        />
        <CustomTextInput
          keyboardType={'default'}
          leftImg={'lock'}
          placeholder={'Password'}
          widthInput={'82%'}
          rightImg={show ? 'eye' : 'eye-with-line'}
          secure={show}
          rightClick={() => setShow(!show)}
          leftColor={'black'}
          width={'100%'}
          lftChkd
        />
        <MyText
          txt="Forget Password?"
          style={{
            color: Colors.primary,
            marginVertical: 20,
            alignSelf: 'flex-end',
          }}
          onPress={() => navigation.navigate('ForgetPassword')}
        />
        <CustomButton
          title="Login"
          bgClr={Colors.primary}
          txtSize={20}
          width={'100%'}
          mBottom={20}
          onClick={() => navigation.navigate('HomeStack')}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15,
  },
  googleContaier: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  googlettxt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 50,
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    marginTop: 30,
    marginBottom: 10,
  },
});
export default Login;
