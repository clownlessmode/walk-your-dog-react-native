import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchResults: {
    position: 'absolute',
    top: 45, // Maybe top: 0
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    maxHeight: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
export default styles;
