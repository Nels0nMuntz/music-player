import { useMutation } from "@tanstack/react-query";
import { Track, uploadAudioFile } from "@/entities/track";
import { QUERY_KEYS } from "@/shared/api";
import { queryClient } from "@/shared/configs";
import { toast } from "sonner";

interface Options {
  onSuccess: (track: Track) => void;
}

export const useUploadAudioFileMutation = ({ onSuccess }: Options) => {
  return useMutation({
    mutationFn: uploadAudioFile,
    onSuccess: (response) => {
      toast.success("The file has been uploaded");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tracks] });
      if (response) onSuccess(response);
    },
    onError: (error) => {
      toast.success(error.message || "Failed to upload the file");
    },
  });
};
