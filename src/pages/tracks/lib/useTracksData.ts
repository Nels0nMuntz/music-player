import { useEffect } from "react";
import { toast } from "sonner";
import { useGenresQuery } from "@/entities/genres";
import { useTracksQuery } from "../api/useTracksQuery";
import {
  useFilters,
  usePagination,
  useSearchText,
  useSettingsActions,
  useSorting,
} from "@/shared/model";
import { useDebounce } from "@/shared/lib";

export const useTracksData = () => {
  const sorting = useSorting();
  const filters = useFilters();
  const pagination = usePagination();
  const searchText = useSearchText();
  const debouncedSearchText = useDebounce(searchText, 500);
  const { setSorting, setFilters, setPagination, setIsSearching } = useSettingsActions();
  const { genresData = [], genresError, isLoadingGenres } = useGenresQuery();
  const { tracksData, tracksError, isLoadingTracks } = useTracksQuery({
    pagination,
    sorting: {
      sortBy: sorting[0]?.id,
      order: sorting[0]?.desc ? "desc" : "asc",
    },
    filters: {
      artist: filters.artist,
      genre: filters.genres,
    },
    search: debouncedSearchText,
    queryOptions: {
      placeholderData: (oldData) => oldData,
    },
  });

  useEffect(() => {
    if (searchText) {
      setSorting([]);
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      });
      setFilters({
        artist: "",
        genres: "",
      });
      setIsSearching(isLoadingTracks);
    } else {
      setIsSearching(false);
    }
  }, [searchText, isLoadingTracks]);

  if (tracksError) {
    toast.error(tracksError.message);
  }
  if (genresError) {
    toast.error(genresError.message);
  }

  const isLoading = isLoadingTracks || isLoadingGenres;

  return { genresData, tracksData, isLoading };
};
