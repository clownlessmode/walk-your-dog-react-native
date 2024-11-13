import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    blockPeet: {
        width: width,
        gap: 10,
        paddingHorizontal: 15,
        backgroundColor: 'white',
      },
})
export default styles