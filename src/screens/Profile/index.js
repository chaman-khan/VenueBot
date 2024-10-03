import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {MyText} from '../../assets/Fonts';
import CustomTextInput from '../../components/Input';

const Profile = ({navigation}) => {
  return (
    <View style={{paddingHorizontal: '5%', alignItems: 'center'}}>
      <TopBar
        title={'Profile'}
        leftImage={Assets.logo}
        rightImgs
        rightImg2={'dots-three-horizontal'}
        styleRightImage2={styles.topDots}
        rightImg2Size={13}
      />
      <Image source={Assets.dp} style={styles.dp} />
      <MyText title={'Chamman Khan'} heading />
      <View style={styles.line} />
      <ScrollView>
        <CustomTextInput
          value={'Manage Events'}
          touch
          leftImg={'calendar'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
        />
        <CustomTextInput
          value={'Messsage Center'}
          touch
          leftImg={'chat'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
        />
        <View style={styles.line} />
        <CustomTextInput
          value={'profile'}
          touch
          leftImg={'user'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
          onPress={() => {
            navigation.navigate('UserProfile');
          }}
        />
        <CustomTextInput
          value={'Notifications'}
          touch
          leftImg={'bell'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
        />
        <CustomTextInput
          value={'Payments'}
          touch
          leftImg={'clapperboard'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
        />
        <CustomTextInput
          value={'Linked Accounts'}
          touch
          leftImg={'link'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
        />
        <CustomTextInput
          value={'privacy Policy'}
          touch
          leftImg={'documents'}
          lftChkd
          rightImg={'chevron-thin-right'}
          width={'100%'}
          noBorder
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  topDots: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
    padding: 3,
  },
  dp: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginVertical: 20,
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    height: 1,
    marginVertical: 17,
    backgroundColor: 'lightgrey',
  },
});
export default Profile;
