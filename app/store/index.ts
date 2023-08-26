import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  Character,
  CharacterFilters,
  CharacterInfo,
  EpisodeFilters,
  EpisodeInfo,
  UserData,
} from "../types";
import { getCharacters } from "../services/getCharacters";
import { getEpisodes } from "../services/getEpisodes";

interface RootState {
  userData?: UserData;
  isLoggedIn?: boolean;
  setUserData: (user: UserData) => void;
  setLoggedIn: () => void;
  getCharacters: () => Promise<void>;
  getEpisodes: () => Promise<void>;
  characterInfo?: CharacterInfo;
  episodeInfo?: EpisodeInfo;
  characterFilters?: CharacterFilters;
  episodeFilters?: EpisodeFilters;
  setCharacterFilters: (filters?: CharacterFilters) => Promise<void>;
  setEpisodeFilters: (filters?: CharacterFilters) => Promise<void>;
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

        setCharacterFilters: async filters => {
          set(() => ({
            // to persist previous filters
            characterFilters: { ...get().characterFilters, ...filters },
          }));
          await get().getCharacters();
        },

        setEpisodeFilters: async filters => {
          set(() => ({
            // to persist previous filters
            episodeFilters: { ...get().episodeFilters, ...filters },
          }));
          await get().getEpisodes();
        },

        getEpisodes: async () => {
          const filters = get().episodeFilters;
          const episodes = await getEpisodes({
            page: filters?.page || 0,
            filter: { ...filters },
          });
          set(() => ({ episodeInfo: episodes }));
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
