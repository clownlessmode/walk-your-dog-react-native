import globalStyles from "@shared/constants/globalStyles";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  eventsTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: '#00000085',
  },
  scrollEvent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loadingContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  noEventsContainer: {
    alignItems: 'center',
    backgroundColor: '#e7efbe',
    height: 80,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
  },
  noEventsText: {
    fontSize: 14,
    opacity: 0.5,
  },
  addRecordButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
    borderRadius: 48,
    borderWidth: 1,
    padding: 15,
  },
  addRecordButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    ...globalStyles.text500,
  },

    events: {
      backgroundColor: 'white',
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 13,
      width: '100%',
      gap: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    // scrollEvent: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    // },
  });
  export default styles