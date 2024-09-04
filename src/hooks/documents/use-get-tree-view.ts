import { create } from "zustand";

type GetInfoType = {
  isOpenModalTreeView: boolean;
  setIsOpenModalTreeView: () => void;
};

export const useGetTreeView = create<GetInfoType>((set) => ({
  isOpenModalTreeView: false,
  setIsOpenModalTreeView: () =>
    set((state) => ({ isOpenModalTreeView: !state.isOpenModalTreeView })),
}));
