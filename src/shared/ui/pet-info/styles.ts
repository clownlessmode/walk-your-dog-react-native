import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  greyBlock: {
    width: '100%',
    gap: 10,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 16,
    padding: 10,
  },
  lightBlock: {
    width: '100%',
    gap: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  infoPet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
export default styles;
