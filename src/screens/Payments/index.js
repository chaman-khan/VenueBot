import React, {useState} from 'react';
import {Text, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {MyText} from '../../assets/Fonts';
import CustomRadioButton from '../../components/RadioButtton';
import CustomButton from '../../components/Buttton';
import {Colors} from '../../theme';
import {useSelector} from 'react-redux';
const Payments = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const creditCards = useSelector(state => state.data.creditCards);
  console.log('.....', creditCards);

  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar title={'Payments'} onPress={() => navigation.goBack()} />
      <MyText
        title={'Select the Payment method you want to use'}
        style={{marginVertical: 10}}
      />
      <CustomRadioButton
        options={creditCards}
        type2
        selectedOption={selectedOption?.title}
        onSelect={setSelectedOption}
      />
      <CustomButton
        title="Add New Card"
        bgClr="rgb(249, 229, 248)"
        width="100%"
        txtStyle={{color: Colors.primary}}
        txtSize={20}
        marginVertical={40}
        onClick={() => navigation.navigate('AddNewCard')}
      />
      <View style={{marginTop: 100}}>
        <View style={{height: 1, backgroundColor: 'grey', marginBottom: 15}} />
        <CustomButton
          title={'Continue'}
          width="100%"
          txtSize={20}
          onClick={() => navigation.navigate('ReviewSummary')}
        />
      </View>
    </View>
  );
};
export default Payments;
