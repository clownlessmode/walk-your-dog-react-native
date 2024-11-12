import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modal: {
    gap: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 36,
    paddingHorizontal: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButton: {
    position: 'absolute',
    bottom: 250, // Измените это значение в зависимости от желаемой позиции
    right: 15,   // Добавил отступ справа
    backgroundColor: '#fff',
    borderRadius: 9999,
    paddingVertical: 15,
    paddingHorizontal: 17,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 99,
  },
});
export default styles;
