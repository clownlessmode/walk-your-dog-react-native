import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    width: '100%',
    gap: 20,
    paddingBottom: 20,
  },
  inputForIos: {
    width: '100%',
    height: 50,
    borderColor: '#9D9D9D',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  errorInputForIos: {
    width: '100%',
    height: 50,
    borderColor: 'red',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  addForm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
export default styles;
