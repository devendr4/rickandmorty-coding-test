import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  Character,
  CharacterFilters,
  CharacterInfo,
  Episode,
  EpisodeFilters,
  EpisodeInfo,
  UserData,
} from "../types";
import { getCharacters } from "../services/getCharacters";
import { getEpisodes } from "../services/getEpisodes";
import localforage from "localforage";
import Cookies from "universal-cookie";

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

const cookies = new Cookies(null, { path: "/" });
export const useRootStore = create<RootState>()(
  devtools(
    persist(
      (set, get) => ({
        userData: undefined,
        isLoggedIn: !!cookies.get("logged") || false,
        characterInfo: undefined,
        characterFilters: undefined,
        setUserData: user => set(() => ({ userData: user, isLoggedIn: true })),
        setLoggedIn: () => {
          cookies.set("logged", "true", {
            //cookie valid for 1 minute
            expires: new Date(Date.now() + 1 * 60 * 1000),
          });

          set(() => ({ isLoggedIn: true }));
        },

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
          const data = await getEpisodes({
            page: filters?.page || 0,
            filter: { ...filters },
          });

          let cachedEpisodes: Episode[] =
            (await localforage.getItem("episodes")) || [];

          cachedEpisodes = cachedEpisodes.filter(ep => {
            if (filters?.episode || filters?.name)
              return (
                (filters?.name &&
                  ep.name.toLowerCase().includes(filters.name)) ||
                (filters?.episode &&
                  ep.episode.toLowerCase().includes(filters.episode))
              );

            return true;
          });

          const episodeCount = data.info.count + cachedEpisodes.length;

          set(() => ({
            episodeInfo: {
              info: {
                count: episodeCount,
                pages: Math.ceil(episodeCount / 20),
              },
              //returns both cached and API episodes
              episodes: [
                ...cachedEpisodes,
                // only return api episodes that haven't been edited and cached before
                ...data.episodes.filter(
                  ep => !cachedEpisodes.map(v => v.id).includes(ep.id)
                ),
              ],
            },
          }));
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
              characters: [
                ...cachedCharacters,
                // only return api characters that haven't been edited and cached before
                ...data.characters.filter(
                  ch => !cachedCharacters.map(v => v.id).includes(ch.id)
                ),
              ],
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
