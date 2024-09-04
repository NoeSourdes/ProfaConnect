import { create } from "zustand";

type SelectedDocumentsType = {
  selectedDocuments: any[];
  setSelectedDocuments: (document: any[]) => void;
};

export const useSelectedDocuments = create<SelectedDocumentsType>((set) => ({
  selectedDocuments: [],
  setSelectedDocuments: (document) => set({ selectedDocuments: document }),
}));
