import { api } from "@/shared/api";

export const deleteTrack = async (id: string) => {
  await api.remove("tracks", { params: id });
};
