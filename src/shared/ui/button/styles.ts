import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonDark: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#262626",
        borderRadius: 48,
        borderWidth: 1,
        padding: 15,
      },
      textDark: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "500",
      },
      buttonLight: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 48,
        borderWidth: 1,
        borderColor: "#262626",
        padding: 15,
      },
      textLight: {
        textAlign: "center",
        color: "#262626",
        fontSize: 16,
        fontWeight: "500",
      },
})

export default styles;