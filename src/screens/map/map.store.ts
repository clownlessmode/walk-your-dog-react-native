import { create } from 'zustand';

interface MapStore {
  map: string | null;
  setMap: (telephone: string | null) => void;
}

const useMapStore = create<MapStore>((set) => ({
    map: null,
    setMap: (map) => set(() => ({ map: map })),
}));
export default useMapStore;