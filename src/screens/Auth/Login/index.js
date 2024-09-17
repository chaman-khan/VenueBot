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
import {Family} from '../../../assets/FontFamily';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../../components/Input';
import CustomButton from '../../../components/Buttton';
import {Colors} from '../../../theme';
import {Assets} from '../../../assets/images';
const Login = ({navigation}) => {
  const [show, setShow] = useState(true);
  const {width, height} = Dimensions.get('screen');
  return (
    <ScrollView style={{height: height}}>
      <View style={{alignItems: 'center', marginVertical: 50}}>
        <View style={styles.header}>
          <Image
            source={Assets.logo}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              marginRight: 15,
            }}
          />
          <Text style={styles.name}>VenueBot</Text>
        </View>
        <Text style={styles.txt}>Sign in to your account</Text>
        <Text style={{fontSize: 11, fontWeight: '300', color: 'black'}}>
          Don't have account?{' '}
          <Text
            style={{color: Colors.primary, fontWeight: '500', fontSize: 14}}>
            Sign up
          </Text>
        </Text>
        <View style={styles.googlettxt}>
          <Text>Sign in with</Text>
          <CustomButton
            buttonStyle={{backgroundColor: 'white', height: 40}}
            width="30%"
            txtStyle={{color: 'black'}}
            icon={Assets.google}
            iconSize={20}
            title="Google"
          />
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
          leftColor={'black'}
          lftChkd
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
          lftChkd
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgetPassword')}
          style={{
            alignSelf: 'flex-end',
          }}>
          <Text style={styles.frgt}>Forget Password?</Text>
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
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    fontFamily: Family,
    letterSpacing: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 18,
    fontFamily: Family,
    marginVertical: 10,
    letterSpacing: 0.2,
  },
  googleContaier: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,

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
  frgt: {
    color: Colors.primary,
    fontFamily: Family,
    marginRight: '5%',
    marginVertical: 20,
  },
});
export default Login;
