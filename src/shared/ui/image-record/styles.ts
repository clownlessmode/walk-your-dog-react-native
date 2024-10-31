import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 328,
    height: 150,
    borderRadius: 16,
  },
  overlay: {
    padding: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
  },
  textDescription: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
});
export default styles;
