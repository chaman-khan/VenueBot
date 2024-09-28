import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Modal, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../theme';
import {MyText} from '../../assets/Fonts';
import {Family} from '../../assets/FontFamily';

const {width, height} = Dimensions.get('window');

const DropdownComponent = ({
  onDropdownChange,
  data,
  value,
  placeholder,
  width,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleSelect = (item, index) => {
    if (item === 'Other') {
      setIsModalVisible(true);
    } else {
      setSelectedItem(item);
      onDropdownChange(item);
    }
  };
  const handleModalSubmit = () => {
    onDropdownChange(customInput);
    setIsModalVisible(false);
    setCustomInput('');
  };

  return (
    <View style={{alignSelf: 'center'}}>
      <SelectDropdown
        data={data}
        onSelect={handleSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View
              style={{
                ...styles.dropdownButtonStyle,
                width: width ? width : 150,
              }}>
              <MyText title={(selectedItem && selectedItem) || placeholder} />
              <Entypo
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {backgroundColor: '#D2D9DF'}),
              }}>
              <MyText title={item} />
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MyText
              title="Enter Event Type"
              heading
              style={{marginBottom: 10}}
            />
            <TextInput
              style={styles.modalInput}
              value={customInput}
              onChangeText={setCustomInput}
              placeholder="Type here..."
            />
            <MyText
              title={'Submit'}
              style={{color: '#007aff', fontSize: 17}}
              onPress={handleModalSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: Family,
  },
});

export default DropdownComponent;
