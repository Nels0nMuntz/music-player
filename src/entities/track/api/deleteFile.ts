import { api } from "@/shared/api";

export const deleteFile = (id: string) => api.remove("tracks", { params: `${id}/file` });
