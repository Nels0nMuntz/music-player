import { useMutation } from "@tanstack/react-query";
import { Track, updateTrack } from "@/entities/track";
import { queryClient } from "@/shared/configs";
import { QUERY_KEYS } from "@/shared/api";
import { toast } from "sonner";

interface Options {
  onSubmitted: () => void;
}

export const useEditTrackMutation = ({ onSubmitted }: Options) => {
  return useMutation({
    mutationFn: updateTrack,
    onMutate: async (newRecord) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.tracks] });
      const prevRecords = queryClient.getQueryData([QUERY_KEYS.tracks]);
      queryClient.setQueryData<Track[]>([QUERY_KEYS.tracks], (oldRecords) => [
        {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title: newRecord.title,
          artist: newRecord.artist,
          album: newRecord.album,
          genres: newRecord.genres,
          coverImage: newRecord.coverImage,
        } as Track,
        ...(oldRecords || []),
      ]);

      return { prevRecords };
    },
    onSuccess: () => {
      toast.success("The track has been added");
      onSubmitted();
    },
    onError: (error, _, context?: { prevRecords: unknown }) => {
      toast.error(error.message);
      queryClient.setQueryData([QUERY_KEYS.tracks], context?.prevRecords);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tracks] }),
  });
};
