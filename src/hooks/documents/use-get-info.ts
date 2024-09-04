import { create } from "zustand";

type GetInfoType = {
  isOpenModalInfo: boolean;
  setIsOpenModalInfo: () => void;
};

export const useGetInfo = create<GetInfoType>((set) => ({
  isOpenModalInfo: false,
  setIsOpenModalInfo: () =>
    set((state) => ({ isOpenModalInfo: !state.isOpenModalInfo })),
}));
