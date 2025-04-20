import { API_ENDPOINTS } from "./apiEndpoints";
import { RequestParams } from "../model/types/requestParams";
import { isError, objectToQueryParams } from "../lib/utils";

type RequestUrl = keyof typeof API_ENDPOINTS;
type RequestOptions = Omit<RequestInit, "body"> & {
  body: any;
  params?: string;
  query?: RequestParams;
};
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL = "http://localhost:3000/api";

const httpClient = (method: HTTPMethod) => {
  return async <ResponseData>(url: RequestUrl, options?: RequestOptions) => {
    try {
      const params = options?.params ? `/${options?.params}` : "";
      const query = options?.query ? `?${objectToQueryParams(options.query)}` : "";
      const response = await fetch(`${BASE_URL}${API_ENDPOINTS[url]}${params}${query}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });
      const json = await response.json();

      if (isError(json)) {
        throw new Error(json.message || json.error);
      }
      return json as ResponseData;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };
};

const get = httpClient("GET");
const post = (url: RequestUrl, options?: RequestOptions) => {
  return httpClient("POST")(url, {
    ...options,
    body: JSON.stringify(options?.body || {}),
  });
};

export const api = {
  get,
  post,
};
