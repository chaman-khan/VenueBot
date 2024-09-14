import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Family} from '../../../components/family';
import {Colors} from '../../../components/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
const Login = ({navigation}) => {
  const [show, setShow] = useState(true);
  const {width, height} = Dimensions.get('screen');
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
        <Text style={styles.txt}>Sign in to your accout</Text>
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
          <Text style={{fontSize: 12, fontWeight: '300', color: 'black'}}>
            Don't have accout?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: Colors.primary, fontWeight: '500'}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.googlettxt}>
          <Text>Sign in with</Text>
          <TouchableOpacity style={styles.googleContaier}>
            {/* <AntDesign name="google" size={20} /> */}
            <Image
              source={require('../../../images/google.png')}
              style={{width: 30, height: 30}}
            />
            <Text
              style={{fontSize: 15, color: 'grey', fontFamily: Family}}
              selectable={false}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.or}>
          <View style={{flex: 1, height: 0.5, backgroundColor: 'black'}} />
          <Text style={{fontWeight: '300'}}>or</Text>
          <View style={{flex: 1, height: 0.5, backgroundColor: 'black'}} />
        </View>
        <CustomTextInput
          keyboardType={'email-address'}
          leftImg={'mail'}
          placeholder={'Email'}
        />
        <CustomTextInput
          keyboardType={'default'}
          leftImg={'lock'}
          placeholder={'Password'}
          widthInput={'82%'}
          rightImg={show ? 'eye' : 'eye-with-line'}
          secure={show}
          rightClick={() => setShow(!show)}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}
          style={{
            alignSelf: 'flex-end',
          }}>
          <Text style={styles.frgt}>Forget Password</Text>
        </TouchableOpacity>
        <CustomButton
          title="Login"
          bgClr={Colors.primary}
          txtSize={20}
          width={'90%'}
          mBottom={20}
          onClick={() => navigation.navigate('HomeStack')}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  name: {
    fontSize: 40,
    fontWeight: '600',
    color: 'black',
    marginLeft: -40,
    fontFamily: Family,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 22,
    fontFamily: Family,
    fontWeight: '400',
  },
  googleContaier: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    backgroundColor: 'white',
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
  frgt: {
    color: Colors.primary,
    fontFamily: Family,
    marginRight: '5%',
    marginVertical: 20,
  },
});
export default Login;
