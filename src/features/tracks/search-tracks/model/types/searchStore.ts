interface SearchState {
  searchText: string;
  isSearching: boolean;
}
interface SearchActions {
  actions: {
    setSearchText: (value: string) => void;
    setIsSearching: (value: boolean) => void;
  };
}

export interface SearchStore extends SearchState, SearchActions {}
