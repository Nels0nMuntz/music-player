import { api } from "@/shared/api";
import { CreateTrackRequest } from "../model/types/createTrackRequest";

export const createTrack = (data: CreateTrackRequest) =>
  api.post("tracks", {
    body: data,
  });
