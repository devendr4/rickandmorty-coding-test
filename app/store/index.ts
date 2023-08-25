import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Character, CharacterFilters, CharacterInfo, UserData } from "../types";
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
          let cachedCharacters: Character[] = JSON.parse(
            localStorage.getItem("characters") || "{}"
          );
          const data = await getCharacters({
            page: filters?.page || 0,
            filter: { ...filters },
          });
          cachedCharacters = [
            ...new Set([...cachedCharacters, ...data.characters]),
          ];

          localStorage.setItem("characters", JSON.stringify(cachedCharacters));
          set(() => ({
            characterInfo: { info: data.info, characters: cachedCharacters },
          }));
        },
      }),
      {
        partialize: state => ({ userData: state.userData }),
        name: "rootStore",
      }
    )
  )
);
