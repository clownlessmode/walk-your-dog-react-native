import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default styles;
