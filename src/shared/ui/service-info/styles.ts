import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
  slash: {
    opacity: 0.5,
  },
  main: {
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  status: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
});
export default styles;
