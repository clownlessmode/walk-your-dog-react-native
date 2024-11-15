import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    flex: 1,
  },
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
    gap: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
  tabButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    right: '28%',
    gap: 10,
    zIndex: 99999,
    width: '100%',
    maxWidth: 170,
  }
});
export default styles;
