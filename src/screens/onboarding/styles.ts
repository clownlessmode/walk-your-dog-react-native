import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  text: {
    fontSize: 24,
  },
  slide: {
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    marginBottom: 84,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressBar: {
    width: 50,
    height: 4,
    backgroundColor: '#E7E7E7',
    borderRadius: 100,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  animatedProgressBar: {
    height: 4,
    borderRadius: 100,
    backgroundColor: '#161616',
  },
});

export default styles;
