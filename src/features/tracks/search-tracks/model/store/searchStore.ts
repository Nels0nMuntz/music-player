import { create } from "zustand";
import { SearchStore } from "../types/searchStore";

const searchStore = create<SearchStore>((set) => ({
  searchText: "",
  isSearching: false,
  actions: {
    setSearchText: (value) => {
      set({ searchText: value });
    },
    setIsSearching: (value) => {
      set({ isSearching: value });
    },
  },
}));

export const useIsSearching = () => searchStore((state) => state.isSearching);
export const useSearchText = () => searchStore((state) => state.searchText);
export const useSearchActions = () => searchStore((state) => state.actions);
