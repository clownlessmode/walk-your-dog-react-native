import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  greyBlock: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 16,
    padding: 10,
    marginTop: 20
  },
  lightBlock: {
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    marginTop: 20
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
