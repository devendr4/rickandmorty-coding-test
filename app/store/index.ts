import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Character, CharacterFilters, CharacterInfo, UserData } from "../types";
import { getCharacters } from "../services/getCharacters";

interface RootState {
  userData?: UserData;
  isLoggedIn?: boolean;
  setUserData: (user: UserData) => void;
  setLoggedIn: () => void;
  getCharacters: () => Promise<void>;
  characterInfo?: CharacterInfo;
  characterFilters?: CharacterFilters;
  setFilters: (filters?: CharacterFilters) => Promise<void>;
}

export const useRootStore = create<RootState>()(
  devtools(
    persist(
      (set, get) => ({
        userData: undefined,
        isLoggedIn: true,
        characterInfo: undefined,
        characterFilters: undefined,
        setUserData: user => set(() => ({ userData: user, isLoggedIn: true })),
        setLoggedIn: () => set(() => ({ isLoggedIn: true })),
        setFilters: async filters => {
          set(() => ({
            characterFilters: { ...get().characterFilters, ...filters },
          }));
          await get().getCharacters();
        },
        getCharacters: async () => {
          const filters = get().characterFilters;
          let cachedCharacters: Character[] = JSON.parse(
            localStorage.getItem("characters") || "[]"
          );
          const data = await getCharacters({
            page: filters?.page || 0,
            filter: { ...filters },
          });

          const cachedIds = new Set(cachedCharacters.map(char => char.id));
          cachedCharacters = [
            ...new Set([
              ...cachedCharacters,
              ...data.characters.filter(newChar => !cachedIds.has(newChar.id)),
            ]),
          ];

          console.log(cachedCharacters);
          localStorage.setItem("characters", JSON.stringify(cachedCharacters));

          cachedCharacters = cachedCharacters.filter(char => {
            if (
              filters?.status ||
              filters?.species ||
              filters?.gender ||
              filters?.name
            )
              return (
                (filters?.name &&
                  char.name.toLowerCase().includes(filters.name)) ||
                (filters?.gender &&
                  char.gender.toLowerCase().includes(filters.gender)) ||
                (filters?.species &&
                  char.species.toLowerCase().includes(filters.species)) ||
                (filters?.status &&
                  char.status.toLowerCase().includes(filters.status))
              );

            return true;
          });
          set(() => ({
            characterInfo: data /* {
              info: {
                count: cachedCharacters.length,
                pages: Math.ceil(cachedCharacters.length / 20),
              },
              characters: cachedCharacters,
            } */,
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
