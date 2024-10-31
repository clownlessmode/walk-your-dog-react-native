import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  sideContainer: {
    minWidth: 24,
    justifyContent: 'center',
  },
  invisible: {
    opacity: 0,
  },
});
export default styles;
