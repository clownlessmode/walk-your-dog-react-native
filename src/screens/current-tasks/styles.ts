import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  year: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  month: {
    fontSize: 24,
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  daySection: {},
  day: {
    fontSize: 14,
    textTransform: 'capitalize',
    marginBottom: 5,
    color: '#ADADAD',
  },
});
export default styles;
