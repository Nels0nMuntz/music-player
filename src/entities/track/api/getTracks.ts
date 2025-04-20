import { api } from "@/shared/api";
import { GetTracksRequest } from "../model/types/getTracksRequest";
import { GetTracksResponse } from "../model/types/getTracksResponse";

export const getTracks = ({ pagination, sorting, filters }: GetTracksRequest) =>
  api.get<GetTracksResponse>("tracks", {
    query: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      sort: sorting?.sortBy,
      order: sorting?.order,
      ...(filters?.artist && { artist: filters.artist }),
      ...(filters?.genre && { genre: filters.genre }),
    },
  });
