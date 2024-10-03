import {StyleSheet} from 'react-native';
import {elevation} from '../../theme/appStyles';

export const styles = StyleSheet.create({
  topLine: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  view: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    ...elevation,
  },
  img: {
    width: '35%',
    height: 110,
    borderRadius: 20,
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    height: 1,
    marginVertical: 17,
    backgroundColor: 'lightgrey',
  },
  rightView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btns: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
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
  greyText: {
    width: '90%',
    textAlign: 'center',
    marginVertical: 20,
    color: 'grey',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
});
