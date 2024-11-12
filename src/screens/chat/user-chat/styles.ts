import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  messageContainer: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#262626',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7EFBE',
  },
  myMesText: {
    color: '#FFFFFF',
  },
  otherMesText: {
    color: '#000000',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    gap: 8,
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
export default styles;
