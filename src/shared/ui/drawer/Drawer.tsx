import React, { useEffect } from 'react';
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
  trigger?: React.ReactNode;
  children: React.ReactNode;
  close?: string;
  modalVisible?: boolean;
  setModalVisible?: (visible: boolean) => void;
  hasBackdrop?: boolean;
}

const { height } = Dimensions.get('window');

function Drawer({
  trigger,
  children,
  close,
  modalVisible,
  setModalVisible,
  hasBackdrop=true,
}: Props) {
  const panAnim = React.useRef(new Animated.Value(height)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const handleAnim = React.useRef(new Animated.Value(0)).current;

  // Используем локальный state, если modalVisible не передан
  const [internalModalVisible, setInternalModalVisible] = React.useState(false);
  const isModalVisible = modalVisible ?? internalModalVisible;
  const toggleModalVisible = setModalVisible || setInternalModalVisible;

  useEffect(() => {
    if (isModalVisible) {
      panAnim.setValue(height);
      Animated.parallel([
        Animated.timing(panAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
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
  }, [isModalVisible, panAnim, opacityAnim]);

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
      const modalHeight = 300;
      const threshold = modalHeight / 2;

      if (dy > threshold) {
        Animated.timing(panAnim, {
          toValue: height,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => {
          toggleModalVisible(false);
        });
      } else {
        Animated.timing(panAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease,
        }).start(() => {
          Animated.sequence([
            Animated.timing(handleAnim, {
              toValue: -2,
              duration: 150,
              useNativeDriver: true,
              easing: Easing.ease,
            }),
            Animated.timing(handleAnim, {
              toValue: 0,
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
    <View >
      <TouchableOpacity onPress={() => toggleModalVisible(!isModalVisible)}>
        {trigger}
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => toggleModalVisible(!isModalVisible)}
        animationType="slide"
        transparent={true}
      >
        {hasBackdrop && (
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
                toggleModalVisible(false);
              });
            }}
          >
            <Animated.View style={[styles.overlay, { opacity: opacityAnim }]} />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.wrapper,
            {
              transform: [{ translateY: panAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Animated.View
            style={[styles.handle, { transform: [{ translateY: handleAnim }] }]}
          />
          <View style={{ width: '100%' }}>
            {children}
            {close && (
              <Button onPress={() => toggleModalVisible(false)}>{close}</Button>
            )}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

export default Drawer;
