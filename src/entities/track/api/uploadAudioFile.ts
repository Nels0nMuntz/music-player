import { api } from "@/shared/api";
import { UploadAudioFileRequest } from "../model/types/uploadAudioFileRequest";
import { Track } from "../model/types/track";

export const uploadAudioFile = ({ file, trackId }: UploadAudioFileRequest) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  return api.post<Track>("tracks", {
    params: `${trackId}/upload`,
    body: formData,
  });
};
