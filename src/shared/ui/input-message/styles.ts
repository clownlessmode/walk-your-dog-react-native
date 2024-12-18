import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
      flex: 1,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderWidth: 0,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
    },
    inputError: {
      flex: 1,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
      borderColor: "red",
    },
    inputContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
    }
  });
  export default styles;