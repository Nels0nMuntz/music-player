import { api } from "@/shared/api";
import { EditTrackRequest } from "../model/types/edittrackRequest";

export const updateTrack = (data: EditTrackRequest) =>
  api.put("tracks", { params: data.id, body: data });
