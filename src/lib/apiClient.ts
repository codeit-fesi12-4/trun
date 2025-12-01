import { API_BASE_URL } from "@/constants";

type ApiError = Error & { status?: number; code?: string | number };

type ApiErrorResponse = {
  code: string | number;
  message: string;
  [key: string]: unknown;
};

export type ApiClientOptions = RequestInit & {
  path: string;
  timeoutMs?: number;
};

const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json; charset=utf-8",
};

const DEFAULT_TIMEOUT_MS = 60000;

export const apiFetch = async <TResponse>({
  path,
  headers,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  ...init
}: ApiClientOptions): Promise<TResponse> => {
  const endpoint = new URL(path, API_BASE_URL).toString();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const mergedHeaders: HeadersInit = { ...DEFAULT_HEADERS, ...headers };

    const response = await fetch(endpoint, {
      headers: mergedHeaders,
      cache: "no-store",
      signal: controller.signal,
      ...init,
    });

    let parsedBody: ApiErrorResponse | { data: TResponse } | TResponse | undefined;
    try {
      parsedBody = (await response.json()) as ApiErrorResponse | { data: TResponse } | TResponse;
    } catch {
      parsedBody = undefined;
    }

    if (!response.ok) {
      const errorBody = parsedBody as ApiErrorResponse | undefined;
      const friendlyMessage = errorBody?.message ?? response.statusText;
      const error: ApiError = new Error(friendlyMessage) as ApiError;
      error.status = response.status;
      error.code = errorBody?.code;
      throw error;
    }

    if (
      parsedBody &&
      typeof parsedBody === "object" &&
      "data" in (parsedBody as Record<string, unknown>)
    ) {
      return (parsedBody as { data: TResponse }).data;
    }

    return parsedBody as TResponse;
  } finally {
    clearTimeout(timeoutId);
  }
};
