import React, {useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {MyText} from '../../assets/Fonts';
import CustomTextInput from '../../components/Input';
import CustomButton from '../../components/Buttton';
import {useDispatch} from 'react-redux';
import {addNewCardItem} from '../../Features/dataSlice';
const AddNewCard = ({navigation, route}) => {
  const item = route?.params?.item;

  const [name, setName] = useState('');
  const [valueNummeric, setValueNumeric] = useState(item ? item.title : '');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const dispatch = useDispatch();
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
  const addCard = () => {
    const newCardData = {
      key: Date.now(),
      title: valueNummeric,
      img: 'cc-mastercard',
      secure: true,
    };
    dispatch(addNewCardItem(newCardData));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, paddingHorizontal: '5%'}}>
      <TopBar title={'AddNewCard'} onPress={() => navigation.goBack()} />
      <ScrollView style={{flexGrow: 1}}>
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
        <CustomTextInput
          placeholder={'Card Holder Name'}
          width={'100%'}
          value={name}
          onChangeText={txt => setName(txt)}
        />
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
      </ScrollView>
      <View style={{height: 1, backgroundColor: 'grey', marginVertical: 15}} />
      <CustomButton title={'Add'} width="100%" txtSize={20} onClick={addCard} />
    </View>
  );
};
export default AddNewCard;
