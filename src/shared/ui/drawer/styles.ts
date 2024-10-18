import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        gap: 14,
        height: "auto",
        justifyContent: "flex-end",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 15,
        paddingBottom: 15,
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 5,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      },
      overlay: {
        flex: 1,
        backgroundColor: "rgba(210, 210, 210, 0.4)",
      },
      handle: {
        width: "40%",
        height: 5,
        borderRadius: 5,
        backgroundColor: "#51582F",
      },
})
export default styles