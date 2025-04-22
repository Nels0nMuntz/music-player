import { api } from "@/shared/api";
import { DeleteTracksResponse } from "../model/types/deleteTracksResponse";

export const deleteTracks = (ids: string[]) =>
  api.post<DeleteTracksResponse>("tracks", {
    params: "delete",
    body: { ids },
  });
