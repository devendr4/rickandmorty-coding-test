import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserData } from "../types";

interface RootState {
  userData?: UserData;
  isLoggedIn?: boolean;
  setUserData: (user: UserData) => void;
  setLoggedIn: () => void;
}

export const useRootStore = create<RootState>()(
  devtools(
    persist(
      set => ({
        userData: undefined,
        isLoggedIn: true,
        setUserData: user => set(() => ({ userData: user, isLoggedIn: true })),
        setLoggedIn: () => set(() => ({ isLoggedIn: true })),
      }),
      {
        partialize: state => ({ userData: state.userData }),
        name: "rootStore",
      }
    )
  )
);
