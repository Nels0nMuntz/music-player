import { Track } from "./track";

export interface GetTracksResponse {
  data: Track[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
