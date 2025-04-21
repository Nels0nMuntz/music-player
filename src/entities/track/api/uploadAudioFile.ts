import { api } from "@/shared/api";
import { UploadAudioFileRequest } from "../model/types/uploadAudioFileRequest";

export const uploadAudioFile = ({ file, trackId }: UploadAudioFileRequest) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  return api.post("tracks", {
    params: `${trackId}/upload`,
    body: formData,
  });
};
