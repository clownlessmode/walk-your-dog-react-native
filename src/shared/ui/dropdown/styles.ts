import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    dropdownContainer: {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 12,
      borderTopWidth: 0,
      borderWidth: 1,
      borderColor: '#9D9D9D',
      width: '100%',
      maxHeight: 200,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      zIndex: 10,
    },
    option: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: '#2A2A2A',
    },
    wrapper: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: 50,
      borderColor: '#9D9D9D',
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 10,
      width: '100%',
    },
    text: {
      color: '#2A2A2A',
    },
  });
  export default styles;