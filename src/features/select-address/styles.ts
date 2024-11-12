import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    blockAddress: {
    width: width - 15,
    gap: 10,
    paddingRight: 15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
export default styles;
