import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ammount: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  blockPrize: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 8,
    alignItems: 'flex-start',
  },
  blockAbonement: {
    height: 150,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titleTextAbon: {
    fontSize: 16,
    color: 'white',
  },
  descripTextAbon: {
    maxWidth: 200,
    fontSize: 12,
    color: 'white',
  },
  textPriceLine: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'line-through',
  },
  textPrice: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 9999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
export default styles;
