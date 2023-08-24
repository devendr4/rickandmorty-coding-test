import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserData } from "../types";

interface RootState {
  userData?: UserData;
  setUserData: (user: UserData) => void;
}

export const useRootStore = create<RootState>()(
  devtools(
    persist(
      set => ({
        userData: undefined,
        setUserData: user => set(() => ({ userData: user })),
      }),
      { name: "rootStore" }
    )
  )
);
