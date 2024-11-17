import { create } from 'zustand';

interface Timer {
  timeLeft: number; // Оставшееся время в секундах
  isRunning: boolean; // Таймер запущен
  intervalId?: NodeJS.Timeout; // ID интервала для очистки
}

interface TimerState {
  timers: Record<string, Timer>; // Таймеры по serviceId
  startTimer: (serviceId: string) => void; // Запуск таймера для определённого сервиса
  decrementTime: (serviceId: string) => void; // Уменьшение времени для определённого сервиса
  resetTimer: (serviceId: string) => void; // Сброс таймера для определённого сервиса
}

const useTimerStore = create<TimerState>((set, get) => ({
  timers: {},

  startTimer: (serviceId) => {
    const { timers } = get();

    if (timers[serviceId]?.isRunning) return;

    const intervalId = setInterval(() => {
      get().decrementTime(serviceId);
    }, 1000);

    set({
      timers: {
        ...timers,
        [serviceId]: {
          timeLeft: timers[serviceId]?.timeLeft ?? 30 * 60, // Установите 30 минут, если таймер ещё не существует
          isRunning: true,
          intervalId,
        },
      },
    });
  },

  decrementTime: (serviceId) => {
    set((state) => {
      const timer = state.timers[serviceId];
      if (!timer) return state;

      const newTimeLeft = Math.max(timer.timeLeft - 1, 0);

      if (newTimeLeft === 0) {
        clearInterval(timer.intervalId);
        return {
          timers: {
            ...state.timers,
            [serviceId]: {
              ...timer,
              isRunning: false,
              timeLeft: 0,
            },
          },
        };
      }

      return {
        timers: {
          ...state.timers,
          [serviceId]: {
            ...timer,
            timeLeft: newTimeLeft,
          },
        },
      };
    });
  },

  resetTimer: (serviceId) => {
    const { timers } = get();

    if (timers[serviceId]?.intervalId) {
      clearInterval(timers[serviceId].intervalId);
    }

    set({
      timers: {
        ...timers,
        [serviceId]: {
          timeLeft: 30 * 60,
          isRunning: false,
        },
      },
    });
  },
}));

export default useTimerStore;
