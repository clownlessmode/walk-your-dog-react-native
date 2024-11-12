import Story from '@entity/stories/model/stories.interface';
import { Ionicons } from '@expo/vector-icons';
import globalStyles from '@shared/constants/globalStyles';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  Modal,
  ImageBackground,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

type FullScreenStoryProps = {
  story: Story;
  isVisible: boolean;
  onClose: () => void;
  onNextStory: () => void;
  onPreviousStory: () => void;
};

const FullScreenStory: React.FC<FullScreenStoryProps> = ({
  story,
  isVisible,
  onClose,
  onNextStory,
  onPreviousStory,
}) => {
  const progress = useRef(new Animated.Value(0)).current;
const insets = useSafeAreaInsets()
  // Reset and start progress whenever a new story is shown
  useEffect(() => {
    progress.setValue(0); // Reset progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000, // 10 seconds for each story
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onNextStory(); // Automatically go to the next story when progress completes
      }
    });
  }, [story]); // Re-run when story changes

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // PanResponder to handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20,
      onPanResponderEnd: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe right - go to previous story
          onPreviousStory();
        } else if (gestureState.dx < -50) {
          // Swipe left - go to next story
          onNextStory();
        }
      },
    })
  ).current;

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <ImageBackground
        source={{ uri: story.image }}
        style={{
          width,
          height,
          justifyContent: 'space-between',
          paddingVertical: 15,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{ alignItems: 'flex-end', paddingHorizontal: 15, padding: insets.top }}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            top: 50,
            width: '100%',
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        >
          <Animated.View
            style={{
              width: progressWidth,
              height: '100%',
              backgroundColor: 'white',
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'flex-start',
            marginLeft: 40,
            marginBottom: 150,
            maxWidth: 300,
          }}
        >
          <Text
            style={[globalStyles.text600, { color: 'white', fontSize: 32 }]}
          >
            {story.title}
          </Text>
          <Text
            style={[globalStyles.text500, { color: 'white', fontSize: 20 }]}
          >
            {story.title}
          </Text>
        </View>
      </ImageBackground>
    </Modal>
  );
};

export default FullScreenStory;
