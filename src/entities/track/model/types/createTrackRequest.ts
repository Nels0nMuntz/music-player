import { Genre } from "@/entities/genres";

export interface CreateTrackRequest {
    title: string;
    artist: string;
    album?: string;
    genres: Genre[];
    coverImage?: string;
}