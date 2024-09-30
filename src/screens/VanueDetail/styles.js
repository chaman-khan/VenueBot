import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../theme';
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    paddingHorizontal: '5%',
    flexGrow: 1,
    alignSelf: 'center',
    marginTop: 10,
  },
  line: {
    height: 0.8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '100%',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  design: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    borderRadius: 40,
  },
  locBG: {
    padding: 15,
    backgroundColor: 'rgba(103, 27, 99, 0.1)',
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  second: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 13,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  managerContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loc: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 25,
    paddingHorizontal: 12,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 30,
  },
  threeDots: {
    borderColor: 'black',
    borderRadius: 30,
    padding: 3,
    borderWidth: 1,
  },
  chatBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
});
export default styles;
