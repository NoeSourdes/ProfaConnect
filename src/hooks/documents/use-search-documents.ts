import { create } from "zustand";

type SearchDocumentsType = {
  searchZustand: string;
  setSearchZustand: (search: string) => void;
};

export const useSearchDocuments = create<SearchDocumentsType>((set) => ({
  searchZustand: "",
  setSearchZustand: (search) => set({ searchZustand: search }),
}));
