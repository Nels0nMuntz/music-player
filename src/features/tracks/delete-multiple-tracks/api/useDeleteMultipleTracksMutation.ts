import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTracks, Track } from "@/entities/track";
import { QUERY_KEYS } from "@/shared/api";
import { queryClient } from "@/shared/configs";

interface Options {
  onSuccess: () => void;
}

export const useDeleteMultipleTracksMutation = ({ onSuccess }: Options) => {
  return useMutation({
    mutationFn: deleteTracks,
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.tracks] });
      const prevRecords = queryClient.getQueryData([QUERY_KEYS.tracks]);
      queryClient.setQueryData<Track[]>([QUERY_KEYS.tracks], (oldRecords) => [
        ...(oldRecords || []).filter((track) => !ids.includes(track.id)),
      ]);
      return { prevRecords };
    },
    onSuccess: (response) => {
        if(response?.failed.length) {
            toast.warning("Not all tracks have been deleted");
        } else {
            toast.success("Tracks have been deleted");
        }
        onSuccess();
    },
    onError: (error, _, context?: { prevRecords: unknown }) => {
      toast.error(error.message || "Failed to delete the tracks");
      queryClient.setQueryData([QUERY_KEYS.tracks], context?.prevRecords);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tracks] });
    },
  });
};
