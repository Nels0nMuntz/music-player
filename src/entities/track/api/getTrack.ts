import { api } from "@/shared/api";
import { Track } from "../model/types/track";

export const getTrack = (slug: string) => api.get<Track>("tracks", { params: slug });
