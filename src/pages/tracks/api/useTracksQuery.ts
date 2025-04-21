import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api";
import { getTracks, GetTracksRequest } from "@/entities/track";

export const useTracksQuery = (options: GetTracksRequest) => {
  const {
    data: tracksData,
    isLoading: isLoadingTracks,
    error: tracksError,
  } = useQuery({
    queryKey: [QUERY_KEYS.tracks, options],
    queryFn: () => {
      let params: GetTracksRequest = {};
      if (options.search) {
        params.search = options.search;
      } else if (options?.filters?.artist || options?.filters?.genre) {
        params.filters = options.filters;
      } else {
        params = options;
      }
      return getTracks(params);
    },
    placeholderData: (oldData) => oldData
  });
  return {
    tracksData,
    isLoadingTracks,
    tracksError,
  };
};
