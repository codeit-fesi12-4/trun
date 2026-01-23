import { ApiError } from "@/utils/error.util";

type ApiFetchOptions = RequestInit & {
  isFormData?: boolean;
  throwOnError?: boolean;
};

export type ApiFailure = {
  ok: false;
  status: number;
  message: string;
  code?: string;
};

export type ApiSuccess<T> = {
  ok: true;
  status: number;
  data: T;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export const apiFetch = async <T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<ApiResult<T>> => {
  const { isFormData, headers, throwOnError = true, ...rest } = options;

  try {
    const response = await fetch(path, {
      ...rest,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(headers ?? {}),
      },
    });
    const result = await response.json();

    // 오류 처리
    if (!response.ok) {
      const message =
        result?.errors?.[0]?.message ?? result?.message ?? "요청 중 오류가 발생했습니다.";

      const code = result?.errors?.[0]?.code ?? result?.code ?? undefined;

      if (!throwOnError && (response.status === 401 || response.status === 404)) {
        console.warn("????");
        return { ok: false, status: response.status, message, code };
      }

      if (response.status === 400 || response.status === 403) {
        return { ok: false, status: response.status, message, code };
      }

      throw new ApiError({ message, status: response.status, code });
    }

    return { ok: true, status: response.status, data: result as T };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
