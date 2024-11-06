import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  radioButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#51582F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonChecked: {
    backgroundColor: '#51582F',
  },
  triggerButton: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
