import {StyleSheet} from 'react-native';
import {elevation} from '../../theme/appStyles';

export const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 10,
    gap: 6,
    ...elevation,
  },
  line: {
    width: '100%',
    marginVertical: 20,
    height: 1,
    backgroundColor: 'lightgrey',
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 20,
    padding: 5,
  },
  img: {
    width: '35%',
    height: 110,
    borderRadius: 20,
  },
  bottomEndView: {
    flexDirection: 'row',
    gap: 5,
    width: '60%',
    alignItems: 'center',
  },
  btns: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
