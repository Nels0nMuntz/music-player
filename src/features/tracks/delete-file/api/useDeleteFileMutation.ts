import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteFile, Track } from "@/entities/track";
import { queryClient } from "@/shared/configs";
import { QUERY_KEYS } from "@/shared/api";

interface Options {
  onSuccess: () => void;
}

export const useDeleteFileMutation = ({ onSuccess }: Options) => {
  return useMutation({
    mutationFn: deleteFile,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.tracks] });
      const prevRecords = queryClient.getQueryData([QUERY_KEYS.tracks]);
      queryClient.setQueryData<Track[]>([QUERY_KEYS.tracks], (oldRecords) => [
        ...(oldRecords || []).map((track) => track.id === id ? ({ ...track, audioFile: "" }) : track),
      ]);
      return { prevRecords };
    },
    onSuccess: () => {
      toast.success("The file has been deleted");
      onSuccess();
    },
    onError: (error, _, context?: { prevRecords: unknown }) => {
      toast.error(error.message || "Failed to delete the file");
      queryClient.setQueryData([QUERY_KEYS.tracks], context?.prevRecords);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tracks] });
    },
  });
};
