import { api } from "@/shared/api";
import { GetTracksRequest } from "../model/types/getTracksRequest";
import { GetTracksResponse } from "../model/types/getTracksResponse";

export const getTracks = ({ pagination, sorting, filters, search }: GetTracksRequest) =>
  api.get<GetTracksResponse>("tracks", {
    query: {
      ...(pagination?.pageIndex && { page: pagination.pageIndex + 1 }),
      ...(pagination?.pageSize && { limit: pagination.pageSize }),
      ...(sorting?.sortBy && { sort: sorting.sortBy }),
      ...(sorting?.order && { order: sorting.order }),
      ...(filters?.artist && { artist: filters.artist }),
      ...(filters?.genre && { genre: filters.genre }),
      ...(search && { search }),
    },
  });
