import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    padding: 12,
    borderRadius: 12
  },
  slash: {
    opacity: 0.5
  },
  main: {
    flexDirection: "row",
    gap:12
  },
  title: {
    fontSize: 16,
    color: 'black'
  }
});
export default styles;
