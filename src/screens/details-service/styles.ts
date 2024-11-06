import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
    gap: 10,
  },
  serviceItem: {
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 16,
    gap: 4,
    marginBottom: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  allPrice: {
    backgroundColor: '#E7EFBE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    paddingVertical: 12,
  },
  conditionsText: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 307,
  },
});
export default styles;
