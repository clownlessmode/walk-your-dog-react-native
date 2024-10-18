import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  name: {
    flexDirection: 'column',
  },
});
export default styles;
