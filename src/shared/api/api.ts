import { API_ENDPOINTS } from "./apiEndpoints";
import { RequestParams } from "../model/types/requestParams";
import { isError, objectToQueryParams } from "../lib/utils";
import { API_BASE_URL } from "../configs";

type RequestUrl = keyof typeof API_ENDPOINTS;
type RequestOptions = Omit<RequestInit, "body"> & {
  body?: any;
  params?: string;
  query?: RequestParams;
};
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const httpClient = (method: HTTPMethod) => {
  return async <ResponseData>(url: RequestUrl, options?: RequestOptions) => {
    try {
      const params = options?.params ? `/${options?.params}` : "";
      const query = options?.query ? `?${objectToQueryParams(options.query)}` : "";
      const isFormData = options?.body instanceof FormData;
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS[url]}${params}${query}`, {
        method,
        headers: {
          ...(!isFormData && { ["Content-Type"]: "application/json" }),
          ...options?.headers,
        },
        ...options,
      });
      if (response.ok && response.statusText === "No Content") return;

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
const post = <ResponseData>(url: RequestUrl, options?: RequestOptions) => {
  const isFormData = options?.body instanceof FormData;
  const body = isFormData ? options?.body : JSON.stringify(options?.body || {});
  return httpClient("POST")<ResponseData>(url, {
    ...options,
    body,
  });
};
const put = <ResponseData>(url: RequestUrl, options?: RequestOptions) => {
  return httpClient("PUT")<ResponseData>(url, {
    ...options,
    body: JSON.stringify(options?.body || {}),
  });
};
const remove = <ResponseData>(url: RequestUrl, options?: RequestOptions) => {
  return httpClient("DELETE")<ResponseData>(url, {
    ...options,
    body: JSON.stringify(options?.body || {}),
  });
};

export const api = {
  get,
  post,
  put,
  remove,
};
