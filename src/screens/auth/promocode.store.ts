import { create } from 'zustand';

interface PromocodeStore {
  promocode: string | null;
  setPromocode: (telephone: string | null) => void;
}

const usePromocodeStore = create<PromocodeStore>((set) => ({
    promocode: null,
    setPromocode: (promocode) => set(() => ({ promocode: promocode })),
}));
export default usePromocodeStore;