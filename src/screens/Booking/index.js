import React, {useMemo, useRef, useState} from 'react';
import {FlatList, Image, Modal, TouchableOpacity, View} from 'react-native';
import TopBar from '../../components/TopBar';
import {Assets} from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {MyText} from '../../assets/Fonts';
import {Colors} from '../../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/Buttton';
import {updateStatus} from '../../Features/dataSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from './styles';
import CustomTextInput from '../../components/Input';

const Booking = () => {
  const bookings = useSelector(state => state.data.bookings);

  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const categories = ['Upcoming', 'Completed', 'Cancelled'];
  const [selected, setSelected] = useState('Upcoming');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSeaarchBar, setShowSeaarchBar] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const statusColor =
    selected == 'Upcoming'
      ? Colors.primary
      : selected == 'Completed'
      ? 'green'
      : 'red';
  const completed = selected == 'Completed';
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      if (selected === 'Upcoming') {
        return booking.status === 'Paid';
      }
      return booking.status === selected;
    });
  }, [bookings, selected]);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.view}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image source={item.data[0].images[0]} style={styles.img} />
          <View style={{width: '60%', gap: 15}}>
            <MyText title={item.data[0].name} heading lines={1} />
            <MyText
              title={item.data[0].availability}
              paragrapgh
              style={{color: Colors.primary}}
            />
            <View style={styles.rightView}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Entypo name="location-pin" size={12} color={Colors.primary} />
                <MyText title={item.data[0].location} lines={1} paragrapgh />
              </View>
              <View style={{...styles.status, borderColor: statusColor}}>
                <MyText title={item.status} style={{color: statusColor}} tiny />
              </View>
            </View>
          </View>
        </View>
        {selected !== 'Cancelled' && (
          <View>
            <View style={styles.line} />
            <View style={styles.btns}>
              {selected !== 'Completed' && (
                <CustomButton
                  title="Cancel Booking"
                  width="40%"
                  bgClr="rgb(249, 229, 248)"
                  height={30}
                  txtStyle={{color: Colors.primary}}
                  onClick={() => {
                    setSelectedIndex(index);
                    refRBSheet.current.open();
                  }}
                />
              )}
              <CustomButton
                title={completed ? 'Leave a Review' : 'Complete'}
                width={completed ? '100%' : '40%'}
                bgClr={completed ? 'white' : Colors.primary}
                txtStyle={{
                  color: completed ? Colors.primary : 'white',
                }}
                height={30}
                onClick={() => {
                  {
                    completed
                      ? refRBSheet.current.open()
                      : setIsModalVisible(true);
                  }
                  setSelectedItem(item);
                  dispatch(updateStatus({index, newStatus: 'Completed'}));
                }}
              />
            </View>
          </View>
        )}
      </View>
    );
  };
  const searchedBookings = filteredBookings.filter(item =>
    item.data[0].name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handlePress = index => {
    setRating(index + 1);
  };
  const EmptyComponent = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 500,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MyText
          title={'No Relative Data'}
          BigHeading
          style={{color: Colors.primary}}
        />
      </View>
    );
  };
  return (
    <View style={{paddingHorizontal: '5%'}}>
      <TopBar
        title={'Bookings'}
        leftImage={Assets.logo}
        rightImgs
        rightImg1={'magnifying-glass'}
        rightImg2={'dots-three-horizontal'}
        rightImg2Size={13}
        right1Click={() => setShowSeaarchBar(!showSeaarchBar)}
        styleRightImage2={{
          borderWidth: 1,
          borderRadius: 30,
          borderColor: 'black',
          padding: 3,
        }}
      />
      {showSeaarchBar && (
        <CustomTextInput
          placeholder={'What Favourite Vanue are you looking for...'}
          width={'100%'}
          value={searchQuery}
          onChangeText={txt => setSearchQuery(txt)}
          lftChkd
        />
      )}
      <View style={styles.topLine}>
        {categories.map(item => {
          const isSelected = item === selected;
          return (
            <View style={{flex: 1, alignItems: 'center'}}>
              <MyText
                title={item}
                heading
                onPress={() => setSelected(item)}
                style={{
                  color: isSelected ? Colors.primary : 'grey',
                  padding: 5,
                  paddingVertical: 10,
                }}
              />
              <View
                style={{
                  width: '100%',
                  height: isSelected ? 2 : 1,
                  backgroundColor: isSelected ? Colors.primary : 'grey',
                }}
              />
            </View>
          );
        })}
      </View>
      <FlatList
        data={searchedBookings}
        renderItem={renderItem}
        ListEmptyComponent={EmptyComponent}
      />
      <RBSheet
        ref={refRBSheet}
        draggable
        height={completed ? 600 : 330}
        customStyles={{
          container: {
            borderRadius: 20,
          },
        }}>
        <View style={{paddingHorizontal: '6%', alignItems: 'center'}}>
          <MyText
            title={completed ? 'Leave A Review' : 'Cancel Booking'}
            BigHeading
          />
          <View style={styles.line} />
          <MyText
            title={
              completed
                ? `How was your experience with ${selectedItem?.data[0].name}`
                : 'Are You sure want to Cancel the Event?'
            }
            BigHeading
            style={{width: '90%', textAlign: 'center', marginVertical: 10}}
          />
          {completed ? (
            <View style={{width: '100%'}}>
              <View style={styles.starContainer}>
                {Array.from({length: 5}, (_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(index)}>
                    <Entypo
                      name={index < rating ? 'star' : 'star-outlined'}
                      size={40}
                      color={Colors.primary}
                      style={styles.star}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.line} />
              <MyText title={'Write Your Review'} heading />
              <CustomTextInput
                placeholder={'Your review here...'}
                full
                width={'100%'}
                maxHeight={150}
                marginBottom={30}
              />
            </View>
          ) : (
            <MyText
              title={
                'Only 80% of funds will be returned to your account according to our policy'
              }
              heading
              style={styles.greyText}
            />
          )}

          <View style={styles.btns}>
            <CustomButton
              title={completed ? 'Maybe Later' : "No, Don't Cancel"}
              width="45%"
              bgClr="rgb(249, 229, 248)"
              txtStyle={{color: Colors.primary}}
              onClick={() => refRBSheet.current.close()}
            />
            <CustomButton
              title={completed ? 'Submit' : 'Yes, Cancel'}
              width="45%"
              onClick={() => {
                !completed &&
                  dispatch(
                    updateStatus({
                      index: selectedIndex,
                      newStatus: 'Cancelled',
                    }),
                  );

                refRBSheet.current.close();
              }}
            />
          </View>
        </View>
      </RBSheet>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MyText title="WOHOOOO!!" BigHeading />
            <View style={styles.line} />
            <MyText
              title={'Congratulations on Completing this Event'}
              BigHeading
              style={{width: '90%', textAlign: 'center', marginVertical: 10}}
            />
            <MyText
              title={
                "Leave your opinions as Review to this event for others's help, as you got free Time"
              }
              heading
              style={styles.greyText}
            />
            <MyText
              title={'Okay ThankU'}
              heading
              style={{color: Colors.primary}}
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Booking;
