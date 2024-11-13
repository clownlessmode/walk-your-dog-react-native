import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    form: {
        alignItems: "center",
        paddingTop: 30,
        width: "100%",
        gap: 20,
      },
      input: {
        color: "#2A2A2A",
        height: 50,
        borderColor: "#9D9D9D",
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: "100%",
      },
      inputError: {
        color: "#2A2A2A",
        height: 50,
        borderColor: "red",
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: "100%",
      },
})
export default styles