import React, {useState} from 'react';
import {Image, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {MyText} from '../../assets/Fonts';
import CustomTextInput from '../../components/Input';
import CustomButton from '../../components/Buttton';
const AddNewCard = ({navigation}) => {
  const [valueNummeric, setValueNumeric] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const handleChangeNumeric = text => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    setValueNumeric(formatted);
  };
  const handleCvv = text => {
    const cleaned = text.replace(/\D/g, '');
    setCvv(cleaned);
  };
  const handleExpiry = text => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    setExpiry(formatted);
  };

  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar title={'AddNewCard'} onPress={() => navigation.goBack()} />
      <Image
        source={Assets.creditCard}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 20,
          marginVertical: 10,
        }}
        resizeMode="cover"
      />
      <MyText title={'Card Name'} heading />
      <CustomTextInput placeholder={'Card Holder Name'} width={'100%'} />
      <MyText title={'Card Number'} heading />
      <CustomTextInput
        placeholder={'XXXX XXXX XXXX XXXX'}
        width={'100%'}
        onChangeText={handleChangeNumeric}
        value={valueNummeric}
        maxLength={19}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '48%'}}>
          <MyText title={'Expiry Date'} heading />
          <CustomTextInput
            placeholder={'MM/YY'}
            width={'100%'}
            onChangeText={handleExpiry}
            value={expiry}
            maxLength={5}
            rightImg={'calendar'}
          />
        </View>
        <View style={{width: '48%'}}>
          <MyText title={'CVV'} heading />
          <CustomTextInput
            placeholder={'XXX'}
            width={'100%'}
            onChangeText={handleCvv}
            value={cvv}
            maxLength={3}
          />
        </View>
      </View>
      <View style={{marginTop: 100}}>
        <View style={{height: 1, backgroundColor: 'grey', marginBottom: 15}} />
        <CustomButton
          title={'Add'}
          width="100%"
          txtSize={20}
          onClick={() => navigation.navigate('ContactInfo')}
        />
      </View>
    </View>
  );
};
export default AddNewCard;
