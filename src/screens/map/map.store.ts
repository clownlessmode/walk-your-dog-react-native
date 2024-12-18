import BaseEntity from '@shared/types/base-entity.interface';
import { create } from 'zustand';

export interface Location extends BaseEntity {
  address: string;
  lat: number;
  lon: number;
  name: string | null;
  apartment?: string | null;
  entrance?: string | null;
  doorcode?: string | null;
}
interface MapStore {
  map: string | null; // Для хранения последнего выбранного адреса
  addresses: Location[]; // Новое поле для массива адресов
  setMap: (map: string | null) => void; // Функция для установки адреса
  setAddress: (address: Location) => void; // Новая функция для добавления адреса
}

const useMapStore = create<MapStore>((set) => ({
  map: null,
  addresses: [], // Изначально пустой массив
  setMap: (map) => set(() => ({ map })),
  setAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })), // Добавление нового адреса
}));
export default useMapStore;