import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export const styles = StyleSheet.create({
  barCode: {
    alignItems: 'center',
    paddingVertical: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  view: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    gap: 13,
    justifyContent: 'space-between',
    // ...elevation,
  },
  inner: {flexDirection: 'row', justifyContent: 'space-between'},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey',
  },
  status: {
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 7,
    borderStyle: 'dashed',
  },
});
