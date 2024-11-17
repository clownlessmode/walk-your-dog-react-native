import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  status: {
    justifyContent: 'center',
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 36,
  },
  done: {
    backgroundColor: '#76D219',
  },
  inProgress: {
    backgroundColor: '#FF8B20',
  },
  cancelled: {
    backgroundColor: '#FF3B30',
  },
  default: {
    backgroundColor: '#BFBFBF',
  },
  report: {
    backgroundColor: '#FFD600',
  },
  search: {
    backgroundColor: '#FFD600'
  },
});
export default styles;
