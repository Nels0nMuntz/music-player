import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiError } from "../model";
import { RequestParams } from "../model/types/requestParams";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isError = (response: any): response is ApiError => {
  return (response as ApiError).error !== undefined;
};

export const objectToQueryParams = (obj: RequestParams) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined || value === null) {
        return "";
      }

      if (Array.isArray(value)) {
        return value
          .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join("&");
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
