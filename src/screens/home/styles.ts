import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullWidthBackground: {
    backgroundColor: '#EDEDED',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  paddedContent: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 20,
  },
  balance: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 13,
    alignItems: 'center',
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export default styles;
