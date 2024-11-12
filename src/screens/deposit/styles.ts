import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  balanceContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  blockArrow: {
    backgroundColor: '#51582F',
    borderRadius: 9999,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    zIndex: 1,
  },
  blockBalance: {
    backgroundColor: '#E7EFBE',
    borderRadius: 16,
    minWidth: '100%',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  blockPrize: {
    borderRadius: 16,
    backgroundColor: 'grey',
    padding: 10,
    gap: 2,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'white', 
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
});

export default styles;
