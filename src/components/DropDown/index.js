import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../theme';

const {width, height} = Dimensions.get('window');

const DropdownComponent = ({
  onDropdownChange,
  data,
  value,
  placeholder,
  isRow,
  title,
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
    const customItem = {title: customInput, icon: 'pencil'}; // Example icon
    setSelectedItem(customItem);
    onDropdownChange(customItem);
    setIsModalVisible(false);
    setCustomInput('');
  };

  return (
    <View style={{alignSelf: 'center'}}>
      <Text
        style={{
          color: Colors.primary,
          fontSize: 14,
          fontWeight: '500',
          position: 'absolute',
          marginLeft: 10,
          backgroundColor: 'white',
          paddingHorizontal: 10,
          top: -10,
          zIndex: 1,
        }}>
        {selectedItem ? selectedItem.title : placeholder}
      </Text>
      <SelectDropdown
        data={data}
        onSelect={handleSelect}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && (
                <Icon
                  name={selectedItem.icon}
                  style={styles.dropdownButtonIconStyle}
                />
              )}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem) || placeholder}
              </Text>
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
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
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
            <Text style={styles.modalTitle}>Enter Custom Value</Text>
            <TextInput
              style={styles.modalInput}
              value={customInput}
              onChangeText={setCustomInput}
              placeholder="Type here..."
            />
            <Button title="Submit" onPress={handleModalSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default DropdownComponent;
