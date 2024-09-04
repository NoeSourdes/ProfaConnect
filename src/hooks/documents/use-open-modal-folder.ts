import { create } from "zustand";

type MyStore = {
  show: boolean;
  toggleShow: (arg: boolean) => void;
};

export const useOpenModalFolder = create<MyStore>((set) => ({
  show: false,
  toggleShow: (arg) => set({ show: arg }),
}));
