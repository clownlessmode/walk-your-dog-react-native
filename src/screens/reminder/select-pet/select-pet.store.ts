import { Pet } from '@entity/pets/model/pet.interface';
import { create } from 'zustand';

interface SelectPetStore {
  selectPet: Pet | Pet[] | null;
  setSelectPet: (selectPet: Pet | Pet[] | null) => void;
}

const useSelectPetStore = create<SelectPetStore>((set) => ({
    selectPet: null,
    setSelectPet: (selectPet) => set(() => ({ selectPet: selectPet })),
}));
export default useSelectPetStore;