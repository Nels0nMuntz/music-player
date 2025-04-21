import { PaginationState, SortingState } from "@tanstack/react-table";

interface FiltersState {
  artist: string;
  genres: string;
}

interface SettingsState {
  sorting: SortingState;
  pagination: PaginationState;
  filters: FiltersState;
  searchText: string;
  isSearching: boolean;
}

interface SettingsActions {
  actions: {
    setSorting: (value: SortingState) => void;
    setPagination: (value: PaginationState) => void;
    // setSorting: (callback: (value: SortingState) => SortingState) => void;
    // setPagination: (callback: (value: PaginationState) => PaginationState) => void;
    setFilters: (value: FiltersState) => void;
    setSearchText: (value: string) => void;
    setIsSearching: (value: boolean) => void;
  };
}

export interface SettingsStore extends SettingsState, SettingsActions {}
