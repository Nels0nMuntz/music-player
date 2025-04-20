export interface GetTracksRequest {
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  sorting?: {
    sortBy: string;
    order: "asc" | "desc";
  };
  filters?: {
    genre?: string;
    artist?: string;
  };
  search?: string;
}
