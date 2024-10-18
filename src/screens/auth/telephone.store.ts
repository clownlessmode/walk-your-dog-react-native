import { create } from 'zustand';

interface TelephoneStore {
  telephone: string | null;
  setTelephone: (telephone: string | null) => void;
}

const useTelephoneStore = create<TelephoneStore>((set) => ({
    telephone: null,
    setTelephone: (telephone) => set(() => ({ telephone: telephone })),
}));
export default useTelephoneStore;