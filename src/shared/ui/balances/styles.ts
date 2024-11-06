import globalStyles from '@shared/constants/globalStyles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  balanceContainer: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  selected: {
    backgroundColor: '#262626',
  },
  unselected: {
    backgroundColor: '#F4F4F4',
  },
  balanceText: {
    ...globalStyles.text500,
    fontSize: 20,
  },
  labelText: {
    ...globalStyles.text500,
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'black',
  },
});
export default styles;
