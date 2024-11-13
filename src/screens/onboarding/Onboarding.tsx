import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import slides from './slides';
import { useEffect, useRef, useState } from 'react';
import SlideItem from './SlideItem';
import globalStyles from '@shared/constants/globalStyles';
import styles from './styles';
import { useAppNavigation } from '@shared/hooks/useAppNavigation';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useAppNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNavigated, setIsNavigated] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlideIndex(slideIndex);
    resetProgressAnimation();
  };

  const resetProgressAnimation = () => {
    progressAnim.setValue(0);

    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });

    animationRef.current.start(({ finished }) => {
      if (finished && !isNavigated) {
        moveToNextSlide();
      }
    });
  };

  const moveToNextSlide = () => {
    if (isNavigated) return;

    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      scrollViewRef.current?.scrollTo({
        x: width * (currentSlideIndex + 1),
        animated: true,
      });
    } else {
      setIsNavigated(true);
      navigation.navigate('identity');
    }
  };

  useEffect(() => {
    resetProgressAnimation();
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [currentSlideIndex]);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <SlideItem item={slide} />
            <Text style={[globalStyles.text500, styles.text]}>
              walk your dog
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.progressBarContainer}>
        {slides.map((_, index) => (
          <View key={index} style={styles.progressBar}>
            {index === currentSlideIndex && (
              <Animated.View
                style={[
                  styles.animatedProgressBar,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{ opacity: 0.3 }}
        onPress={() => {
          if (animationRef.current) {
            animationRef.current.stop();
          }
          setIsNavigated(true);
          navigation.navigate('identity');
        }}
      >
        <Text style={{ paddingVertical: 40 }}>Пропустить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;
