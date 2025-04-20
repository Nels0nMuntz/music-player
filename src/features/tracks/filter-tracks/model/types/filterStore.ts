interface FilterState {
  filters: {
    artist: string;
    genres: string;
  };
}
interface FilterActions {
  actions: {
    setFilters: (filters: { artist: string; genres: string }) => void;
  };
}

export interface FilterStore extends FilterState, FilterActions {}
