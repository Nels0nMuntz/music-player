import { QueryObserverOptions, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/api";
import { getTracks, GetTracksRequest, GetTracksResponse } from "@/entities/track";

interface Options extends GetTracksRequest {
  queryOptions?: Partial<QueryObserverOptions<GetTracksResponse | undefined>>;
}

export const useTracksQuery = (options: Options) => {
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
    ...options?.queryOptions,
  });
  return {
    tracksData,
    isLoadingTracks,
    tracksError,
  };
};
