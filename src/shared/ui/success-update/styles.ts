import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingHorizontal: 15,
      },
      closeButton: {
        position: "absolute",
        right: 0,
      },
      contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      iconContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      checkIcon: {
        position: "absolute",
      },
      succesText: {
        textAlign: "center",
        fontSize: 20,
        maxWidth: 180,
        lineHeight: 25,
        marginTop: 20,
      },
})
export default styles