import { create } from 'zustand';

interface TimerState {
  timeLeft: number; // Оставшееся время в секундах
  isRunning: boolean; // Таймер запущен
  startTimer: () => void; // Запуск таймера
  decrementTime: () => void; // Уменьшение времени
}

const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: 30 * 60, // 30 минут
  isRunning: false,
  startTimer: () => {
    if (!get().isRunning) {
      set({
        isRunning: true,
        timeLeft: get().timeLeft > 0 ? get().timeLeft : 30 * 60,
      });

      const interval = setInterval(() => {
        const { timeLeft, decrementTime } = get();
        if (timeLeft <= 0) {
          clearInterval(interval);
          set({ isRunning: false });
        } else {
          decrementTime();
        }
      }, 1000);
    }
  },
  decrementTime: () =>
    set((state) => ({
      timeLeft: Math.max(state.timeLeft - 1, 0),
    })),
}));

export default useTimerStore;
