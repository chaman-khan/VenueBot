import React, {useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {MyText} from '../../assets/Fonts';
import CustomButton from '../../components/Buttton';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {addToBookings} from '../../Features/dataSlice';
const EnterYourPin = ({navigation}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [icon, setIcon] = useState('squared-cross');
  const [title, setTitle] = useState('Oops, Failed!');
  const [paragraph, setParagraph] = useState(
    'Your paymenyy failed. \n Please check your Internet connection then try again.',
  );
  const [button, setButton] = useState('Try Again');
  const [color, setColor] = useState('red');
  const inputs = useRef([]);
  const data = useSelector(state => state.data.currentBooking);

  const dispatch = useDispatch();
  const handleChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !pin[index]) {
      inputs.current[index - 1].focus();
    } else if (e.nativeEvent.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.nativeEvent.key === 'ArrowRight' && index < 3) {
      inputs.current[index + 1].focus();
    }
  };
  useEffect(() => {
    inputs.current[0].focus();
  }, []);
  const changeState = () => {
    if (title == 'Congratulations!') {
      setIsModalVisible(false);
      dispatch(
        addToBookings({data, status: 'paid', key: new Date().toISOString()}),
      );
      navigation.navigate('E_Ticket');
      console.log('hloooos');
    } else {
      setColor(Colors.primary);
      setIcon('checksquare');
      setTitle('Congratulations!');
      setParagraph(
        'You have successfully placed an order for National Evenue in your area!',
      );
      setButton('View E-Ticket');
    }
  };
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar title={'Enter Your Pin'} onPress={() => navigation.goBack()} />
      <MyText
        title={'Enter Your PIN to confirm payment'}
        style={{textAlign: 'center', marginVertical: 70}}
      />
      <View style={styles.container}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry
            ref={ref => (inputs.current[index] = ref)}
            cursorColor={'transparent'}
          />
        ))}
      </View>
      <CustomButton
        title="Continue"
        width="100%"
        txtSize={20}
        marginVertical={90}
        onClick={() => setIsModalVisible(true)}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{...styles.cross, backgroundColor: color}}>
              {icon == 'squared-cross' ? (
                <Entypo name={icon} size={60} color={'white'} />
              ) : (
                <AntDesign name={icon} size={60} color={'white'} />
              )}
            </View>
            <MyText
              title={title}
              heading
              style={{color: color, marginVertical: 20}}
            />
            <MyText
              title={paragraph}
              style={{
                width: '80%',
                color: 'black',
                marginBottom: 20,
                textAlign: 'center',
              }}
            />
            <CustomButton
              title={button}
              width="100%"
              mBottom={20}
              txtSize={20}
              onClick={changeState}
            />
            <CustomButton
              title="Close"
              width="100%"
              bgClr="rgb(249, 229, 248)"
              txtStyle={{color: Colors.primary}}
              txtSize={20}
              onClick={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    width: '20%',
    height: 50,
    textAlign: 'center',
    fontSize: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cross: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default EnterYourPin;
