import { create } from 'zustand';
interface ReminderType {
  title: string;
  value: string
}
interface ReminderStore {
  reminder: ReminderType | null;
  setReminder: (reminder: ReminderType) => void;
}

const useReminderStore = create<ReminderStore>((set) => ({
    reminder: null,
    setReminder: (reminder) => set(() => ({ reminder: reminder })),
}));
export default useReminderStore;