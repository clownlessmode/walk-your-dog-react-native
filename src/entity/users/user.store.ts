import { create } from "zustand";
import { User } from "./model/user.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
    user: User | null;
    token: string | null;
    isRegistered: boolean;
    isHydrated: boolean;
    setUser: (user: User | null) => void;
    updateNumber: (telephone: string) => void;
    setToken: (token: string | null) => void;
    setIsRegistered: (isRegistered: boolean) => void;
    setIsHydrated: (isHydrated: boolean) => void;
}

const useUserStore = create(
    persist<UserStore>(
        (set) => ({
            user: null,
            token: null,
            isRegistered: false,
            isHydrated: false,
            setUser: (user) => set(() => ({ user: user })),
            updateNumber: (telephone: string) => set((state) => {
                if (state.user) {
                  return { user: { ...state.user, telephone } };
                }
                return state;
              }),
            setToken: (token) => set(() => ({ token: token })),
            setIsRegistered: (isRegistered) => set(() => ({ isRegistered })),
            setIsHydrated: (isHydrated) => set(() => ({ isHydrated })),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setIsHydrated(true);
            },
        }
    )
);

export default useUserStore;
