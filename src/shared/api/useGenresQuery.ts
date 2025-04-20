import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/entities/genres";
import { QUERY_KEYS } from "@/shared/api";

export const useGenresQuery = () => {
  const {
    data: genresData,
    error: genresError,
    isLoading: isLoadingGenres,
  } = useQuery({
    queryKey: [QUERY_KEYS.genres],
    queryFn: getGenres,
  });
  return {
    genresData,
    genresError,
    isLoadingGenres,
  };
};
