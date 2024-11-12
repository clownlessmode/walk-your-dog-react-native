import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    borderRadius: 26,
    elevation: 3,
    shadowColor: '#000', // Цвет тени для iOS
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3, // Прозрачность тени для iOS
    shadowRadius: 3, // Радиус тени для iOS
  },
  optionButton: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },
  titleText: {
    fontSize: 18,
  },
  optionText: {
    fontSize: 16,
  },
});
export default styles;
