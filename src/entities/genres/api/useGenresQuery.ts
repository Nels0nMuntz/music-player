import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api";
import { getGenres } from "./getGenres";

export const useGenresQuery = () => {
  const {
    data: genresData,
    error: genresError,
    isLoading: isLoadingGenres,
  } = useQuery({
    queryKey: [QUERY_KEYS.genres],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 15,
  });
  return {
    genresData,
    genresError,
    isLoadingGenres,
  };
};
