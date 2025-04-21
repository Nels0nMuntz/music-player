import { uploadAudioFile } from "@/entities/track";
import { QUERY_KEYS } from "@/shared/api";
import { queryClient } from "@/shared/configs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Options {
  onSuccess: () => void;
}

export const useUploadAudioFileMutation = ({ onSuccess }: Options) => {
  return useMutation({
    mutationFn: uploadAudioFile,
    onSuccess: () => {
      toast.success("The file has been uploaded");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tracks] });
      onSuccess();
    },
    onError: (error) => {
      toast.success(error.message || "Failed to upload the file");
    },
  });
};
