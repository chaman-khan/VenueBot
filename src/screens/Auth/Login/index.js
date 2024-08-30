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
const Login = () => {
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
          <Text style={{color: Colors.primary, fontWeight: '500'}}>
            Sign up
          </Text>
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
        <View style={styles.mail}>
          <Entypo name="mail" size={20} />
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            style={{width: '92%'}}
          />
        </View>
        <View style={{...styles.mail}}>
          <MaterialCommunityIcons name="onepassword" size={20} />
          <TextInput
            placeholder="Password"
            style={{width: '82%'}}
            secureTextEntry={show}
          />
          <TouchableOpacity activeOpacity={1} onPress={() => setShow(!show)}>
            <Ionicons name={show ? 'eye' : 'eye-off'} size={20} color="grey" />
          </TouchableOpacity>
        </View>
        <Text style={styles.frgt}>Forget Password</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={{fontFamily: Family, fontSize: 20, color: 'white'}}>
            Login
          </Text>
        </TouchableOpacity>
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
  mail: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
  frgt: {
    color: Colors.primary,
    fontFamily: Family,
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginVertical: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
});
export default Login;
