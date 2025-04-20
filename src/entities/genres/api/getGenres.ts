import { api } from "@/shared/api";
import { Genre } from "../model/types/genre";

export const getGenres = () => api.get<Genre[]>("genres")