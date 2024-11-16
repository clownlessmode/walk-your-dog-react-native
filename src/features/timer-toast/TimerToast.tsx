import useTimerStore from '@widgets/time-progress/time.store';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const TimerToast = () => {
  const { timeLeft } = useTimerStore();

  useEffect(() => {
    const interval = setInterval(
      () => {
        const minutes = Math.floor(timeLeft / 60);
        Toast.show({
          type: 'info',
          text1: 'У вас есть 30 минут на заполнение формы',
          text2: `Осталось минут: ${minutes}`,
          visibilityTime: 3000,
        });
      },
      5 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, [timeLeft]);

  return null;
};

export default TimerToast;
