import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonDark: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#262626",
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 42,
        paddingVertical: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        borderRadius: 10,
        paddingHorizontal: 42,
        paddingVertical: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      textLight: {
        textAlign: "center",
        color: "#262626",
        fontSize: 16,
        fontWeight: "500",
      },
})

export default styles;