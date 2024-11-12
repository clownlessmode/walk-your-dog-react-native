import Story from '@entity/stories/model/stories.interface';
import { useStoriesController } from '@entity/stories/stories.controller';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
export default function Stories() {
  const insets = useSafeAreaInsets();
  const { stories, isStoriesLoading } = useStoriesController();

  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const [selectedStory, setSelectedStory] = useState<Story | null>(null); // Указываем тип для selectedStory
  const [showModal, setShowModal] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const duration = 50000000; // Время отображения каждой истории (в миллисекундах)

  const currentProgress = useRef(0);

  useEffect(() => {
    if (showModal && !isPaused) {
      progress.setValue(currentProgress.current);
      const remainingTime =
        duration * (1 - currentProgress.current / (width - 30));
      const animation = Animated.timing(progress, {
        toValue: width - 30,
        duration: remainingTime,
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        if (finished) setShowModal(false);
      });

      return () => {
        animation.stop();
      };
    }
  }, [showModal, isPaused]);

  const handlePressIn = () => {
    setIsPaused(true); // Остановить прогресс
    animationRef.current?.stop(); // Остановить анимацию
  };

  const handlePressOut = () => {
    setIsPaused(false); // Возобновить прогресс
    animationRef.current?.start(); // Продолжить анимацию
  };

  const handlePress = (story: any) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    progress.setValue(0);
  };

  return (
    <>
      {!isStoriesLoading ? (
        <FlatList
          data={stories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                width: 90,
                height: 90,
              }}
              onPress={() => handlePress(item)}
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.story}
              >
                <Text style={styles.text} numberOfLines={2}>
                  {item.title}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 40, color: 'black' }}>Loading...</Text>
        </View>
      )}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          activeOpacity={1} // Отключить затемнение при нажатии
          onPressIn={handlePressIn} // Удержание пальца
          onPressOut={handlePressOut} // Отпускание пальца
          style={styles.modalContainer}
        >
          {selectedStory && (
            <>
              <TouchableOpacity
                onPress={closeModal}
                style={[styles.closeButton, { padding: insets.top }]}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progress,
                    marginTop: insets.top + 30,
                    paddingHorizontal: 15,
                  }, // Учёт безопасных зон и отступов
                ]}
              />
              <ImageBackground
                source={{ uri: selectedStory.image }}
                style={styles.fullImage}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.fullText}>{selectedStory.title}</Text>
                </View>
              </ImageBackground>
            </>
          )}
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  fullImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  fullText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'white', // Серый цвет полоски
    borderRadius: 2,
    position: 'absolute',
    zIndex: 1,
    marginHorizontal: 15, // Отступы по бокам
  },
  container: {
    flexDirection: 'row',
  },
  story: {
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: 17,
    marginRight: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  text: {
    fontSize: 9,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
});
