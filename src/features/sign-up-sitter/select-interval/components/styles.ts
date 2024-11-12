import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    gap: 14,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayButton: {
    backgroundColor: '#F4F4F4',
    padding: 12,
    borderRadius: 11,
  },
  selectedDayButton: {
    backgroundColor: '#E7EFBE',
  },
  dayButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
  },
  selectedDayButtonText: {
    color: 'black',
  },
});
export default styles;
