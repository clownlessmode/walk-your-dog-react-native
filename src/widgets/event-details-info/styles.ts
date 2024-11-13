import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flex: 1
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: "black",
    opacity: 0.5,
    height: 1,
    width: "100%",
    paddingVertical: 4,
  },
  verticalLine: {
    borderBottomWidth: 1,
    borderColor: "black",
    opacity: 0.5,
    width: 1,
    height: "100%",
  },
  event: {
    flexDirection: "column",
    backgroundColor: "#E7EFBE",
    borderRadius: 16,
    padding: 14,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  blockUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 16,
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
});
export default styles;
