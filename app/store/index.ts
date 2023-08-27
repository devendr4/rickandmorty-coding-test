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
import localforage from "localforage";

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
  setEpisodeFilters: (filters?: EpisodeFilters) => Promise<void>;
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
          set(() => {
            // to persist previous filters
            // check if filter argument exists for clearing filters
            const combinedFilters = filters
              ? { ...get().characterFilters, ...filters }
              : undefined;

            return { characterFilters: combinedFilters };
          });
          await get().getCharacters();
        },
        setEpisodeFilters: async filters => {
          set(() => {
            // to persist previous filters
            // check if filter argument exists for clearing filters
            const combinedFilters = filters
              ? { ...get().episodeFilters, ...filters }
              : undefined;

            return { episodeFilters: combinedFilters };
          });
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
          // find created or edited characters
          let cachedCharacters: Character[] =
            (await localforage.getItem("characters")) || [];

          // get regular characters from API
          const data = await getCharacters({
            page: filters?.page || 0,
            filter: { ...filters },
          });

          // filter local cached characters
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
          const characterCount = data.info.count + cachedCharacters.length;
          set(() => ({
            characterInfo: {
              info: {
                count: characterCount,
                pages: Math.ceil(characterCount / 20),
              },
              //returns both cached and API characters
              characters: [...cachedCharacters, ...data.characters],
            },
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
