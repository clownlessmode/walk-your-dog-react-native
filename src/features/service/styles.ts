import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapperColor: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingBottom: 12,
    marginBottom: 16,
  },
  addBlock: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 12,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  serviceContainer: {
    flexDirection: 'column',
    gap: 12,
  }
});
export default styles;
