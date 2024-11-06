import { Pet } from '@entity/pets/model/pet.interface';
import { create } from 'zustand';

interface ServiceItem {
  service: string;
  price: number;
}

interface ServiceStore {
  services: ServiceItem[]; // массив выбранных услуг с названиями и ценами
  address: string | null;
  date: string | null;
  selectedPet: Pet | null;
  setService: (service: ServiceItem) => void;
  removeService: (serviceName: string) => void;
  setAddress: (address: string) => void;
  setDate: (date: string) => void;
  setSelectedPet: (pet: Pet) => void;
}

const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  address: null,
  date: null,
  selectedPet: null,
  setService: (service) =>
    set((state) => ({
      services: [...state.services, service],
    })),

  removeService: (serviceName) =>
    set((state) => ({
      services: state.services.filter(
        (service) => service.service !== serviceName
      ),
    })),

  setAddress: (address) => set({ address }),

  setDate: (date) => set({ date }),
  setSelectedPet: (pet) => set({ selectedPet: pet }),
}));

export default useServiceStore;
