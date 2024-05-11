import { create } from "zustand";

type FullScreenType = {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
};

export const useFullScreen = create<FullScreenType>((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
}));
