import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 14,
    width: '45%',
  },
  lightButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#262626',
    paddingHorizontal: 20,
  },
  darkButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#262626",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 20,
  },
});
export default styles;
