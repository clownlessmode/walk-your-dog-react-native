import { create } from 'zustand';

interface UpdateTelephoneStore {
  updateTelephone: string | null;
  setUpdateTelephone: (telephone: string | null) => void;
}

const useUpdateTelephoneStore = create<UpdateTelephoneStore>((set) => ({
  updateTelephone: null,
  setUpdateTelephone: (updateTelephone) =>
    set(() => ({ updateTelephone: updateTelephone })),
}));
export default useUpdateTelephoneStore;
