import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  wrapper: {
    
    paddingVertical: 12,
    flex: 1,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "white",
    overflow: "hidden",
  },
  blockPeet: {
    width: width,
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
});
export default styles;
