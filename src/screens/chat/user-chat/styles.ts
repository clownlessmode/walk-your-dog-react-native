import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  headerContent: { flexDirection: 'row', gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  textHeader: { alignSelf: 'center' },
  messageRow: { flexDirection: 'row', gap: 10, paddingBottom: 10 },
  myMessageRow: { justifyContent: 'flex-end' },
  otherMessageRow: { justifyContent: 'flex-start' },
  messageContainer: { maxWidth: '70%', borderRadius: 10, padding: 10 },
  myMessage: { backgroundColor: '#DCF8C6' },
  otherMessage: { backgroundColor: '#E5E5EA' },
  myMesText: { color: '#000' },
  otherMesText: { color: '#000' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  attachButton: { backgroundColor: '#F0F0F0', padding: 10, borderRadius: 9999 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#9D9D9D',
    textAlign: 'center',
  },
});

export default styles;
