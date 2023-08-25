import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CharacterFilters, CharacterInfo, UserData } from "../types";
import { getCharacters } from "../services/getCharacters";

interface RootState {
  userData?: UserData;
  isLoggedIn?: boolean;
  setUserData: (user: UserData) => void;
  setLoggedIn: () => void;
  getCharacters: (filters?: CharacterFilters) => Promise<void>;
  characterInfo?: CharacterInfo;
}

export const useRootStore = create<RootState>()(
  devtools(
    persist(
      set => ({
        userData: undefined,
        isLoggedIn: true,
        characterInfo: undefined,
        setUserData: user => set(() => ({ userData: user, isLoggedIn: true })),
        setLoggedIn: () => set(() => ({ isLoggedIn: true })),
        getCharacters: async filters => {
          const data = await getCharacters({
            page: filters?.page || 0,
            filter: { ...filters },
          });
          set(() => ({ characterInfo: data }));
        },
      }),
      {
        partialize: state => ({ userData: state.userData }),
        name: "rootStore",
      }
    )
  )
);
