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
    queryFn: () => getTracks(options),
  });
  return {
    tracksData,
    isLoadingTracks,
    tracksError,
  };
};
