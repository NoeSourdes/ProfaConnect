import { create } from "zustand";

type ViewSelectType = {
  view: string;
  setView: (view: string) => void;
};
const persistMiddleware =
  <T extends ViewSelectType>(config: any) =>
  (set: any, get: any, api: any) => {
    const newSet = (args: any) => {
      set(args);
      const state = get();
      if (typeof window !== "undefined") {
        localStorage.setItem("viewSelect", JSON.stringify(state.view));
      }
    };
    return config(newSet, get, api);
  };

const initialView: string =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("viewSelect") || '"grid_view"')
    : "grid_view";

export const useViewSelect = create<ViewSelectType>(
  persistMiddleware<ViewSelectType>((set: any) => ({
    view: initialView,
    setView: (view: string) => set({ view }),
  }))
);
