import {Image, ScrollView, View} from 'react-native';
import {MyText} from '../../assets/Fonts';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import CustomTextInput from '../../components/Input';
import DropdownComponent from '../../components/DropDown';
import {useState} from 'react';
import CustomButton from '../../components/Buttton';
import DatePicker from 'react-native-date-picker';
const UserProfile = ({navigation}) => {
  const [name, settName] = useState('Chamman');
  const [userName, setUserName] = useState('chaman');
  const [mail, setMail] = useState('chaman.devv@gmail.com');
  const [contact, setContact] = useState('03470549301');
  const [city, setCity] = useState('Islamabad');
  const [gender, setGender] = useState('Male');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const showingDate = `${date.getDate().toString()}/${
    date.getMonth() + 1
  }/${date.getFullYear().toString()}`;
  return (
    <View
      style={{
        paddingHorizontal: '5%',
        alignItems: 'center',
      }}>
      <TopBar title={'User Profile'} onPress={() => navigation.goBack()} />
      <Image
        source={Assets.dp}
        style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          marginVertical: 20,
        }}
      />
      <MyText title={'Chamman Khan'} heading style={{paddingBottom: 10}} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 200}}
        showsVerticalScrollIndicator={false}>
        <CustomTextInput
          placeholder={'First Name'}
          width={'100%'}
          value={name}
          onChangeText={txt => settName(txt)}
        />
        <CustomTextInput
          placeholder={'username'}
          width={'100%'}
          value={userName}
          onChangeText={txt => setUserName(txt)}
        />
        <CustomTextInput
          value={showingDate}
          rightImg={'calendar'}
          touch={true}
          onPress={() => setOpen(true)}
          widthInput={'90%'}
          width={'100%'}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => setOpen(false)}
          mode="date"
          title={'Date Of Birth'}
          buttonColor="red"
        />
        <DropdownComponent
          data={['Male', 'Female', 'Trans']}
          onDropdownChange={setGender}
          value={gender}
          placeholder="Gender"
          width={'100%'}
        />
        <CustomTextInput
          width={'100%'}
          placeholder={'Email'}
          rightImg={'mail'}
          value={mail}
          onChangeText={txt => setMail(txt)}
        />
        <CustomTextInput
          placeholder={'Contact Number'}
          width={'100%'}
          value={contact}
          onChangeText={txt => setContact(txt)}
        />
        <CustomTextInput
          placeholder={'City'}
          width={'100%'}
          value={city}
          onChangeText={txt => setCity(txt)}
        />
        <CustomButton
          title="Update"
          width="100%"
          marginVertical={20}
          mBottom={100}
        />
      </ScrollView>
    </View>
  );
};
export default UserProfile;
