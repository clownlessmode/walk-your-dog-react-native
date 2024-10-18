import React, { Children, useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import Button from '../button/Button';
interface Props {
  trigger: React.ReactNode;
  children: React.ReactNode;
  close?: string;
}
const { height } = Dimensions.get('window');
function Drawer({ trigger, children, close }: Props) {
  const panAnim = React.useRef(new Animated.Value(height)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current; // для прозрачности
  const handleAnim = React.useRef(new Animated.Value(0)).current; // для линии
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (modalVisible) {
      // Сброс значения panAnim перед началом анимации
      panAnim.setValue(height);

      Animated.parallel([
        Animated.timing(panAnim, {
          toValue: 0,
          duration: 400, // Увеличьте продолжительность для более плавной анимации
          useNativeDriver: true,
          easing: Easing.out(Easing.ease), // Используйте более плавную функцию сглаживания
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(panAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }),
      ]).start();
    }
  }, [modalVisible, panAnim, opacityAnim]);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dy } = gestureState;
      if (dy > 0) {
        panAnim.setValue(dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dy } = gestureState;
      const modalHeight = 300; // Высота модального окна
      const threshold = modalHeight / 2; // Порог для определения, закрывать ли окно

      if (dy > threshold) {
        // Если свайп был больше половины высоты модального окна, закрываем окно с анимацией
        Animated.timing(panAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => {
          setModalVisible(false);
        });
      } else {
        // Если свайп был меньше половины высоты модального окна, возвращаем окно в исходное положение с анимацией
        Animated.timing(panAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => {
          // Анимация для линии
          Animated.sequence([
            Animated.timing(handleAnim, {
              toValue: -2, // Поднимаем линию на 10 пикселей вверх
              duration: 150,
              useNativeDriver: true,
              easing: Easing.ease,
            }),
            Animated.timing(handleAnim, {
              toValue: 0, // Возвращаем линию в исходное положение
              duration: 150,
              useNativeDriver: true,
              easing: Easing.ease,
            }),
          ]).start();
        });
      }
    },
  });
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        {trigger}
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.parallel([
              Animated.timing(panAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
              }),
              Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
              }),
            ]).start(() => {
              setModalVisible(false);
            });
          }}
        >
          <Animated.View style={[styles.overlay, { opacity: opacityAnim }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.wrapper,
            {
              transform: [
                {
                  translateY: panAnim,
                },
              ],
              opacity: opacityAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.handle,
              {
                transform: [{ translateY: handleAnim }],
              },
            ]}
          />
          <View style={{width: "100%"}}>
            {children}
            {close && (
              <Button onPress={() => setModalVisible(false)}>
                {close}
              </Button>
            )}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

export default Drawer;
