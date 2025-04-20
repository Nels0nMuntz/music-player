import { create } from "zustand";
import { FilterStore } from "../types/filterStore";

const useFilterStore = create<FilterStore>((set) => ({
  filters: {
    artist: "",
    genres: "",
  },
  actions: {
    setFilters: (filters) => {
      set({ filters });
    },
  },
}));

export const useFilters = () => useFilterStore((state) => state.filters);
export const useFilterActions = () => useFilterStore((state) => state.actions);
