import { AbonementBuyDto } from '@entity/abonements/modal/abonements.interface';
import { Ticket } from '@shared/ui/ticket/Ticket';
import { create } from 'zustand';

interface BuyAbonementStore {
  buyAbonements: Ticket | null;
  setbuyAbonements: (buyAbonements: Ticket | null) => void;
}

const useBuyAbonementsStore = create<BuyAbonementStore>((set) => ({
    buyAbonements: null,
    setbuyAbonements: (buyAbonements) => set(() => ({ buyAbonements: buyAbonements })),
}));
export default useBuyAbonementsStore;