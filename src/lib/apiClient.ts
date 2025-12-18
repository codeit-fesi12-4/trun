import { ApiError } from "@/utils/error.util";

type ApiFetchOptions = RequestInit & {
  isFormData?: boolean;
};

export const apiFetch = async <T>(path: string, options: ApiFetchOptions = {}) => {
  const { isFormData, headers, ...rest } = options;

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

      throw new ApiError({ message, status: response.status, code });
    }

    return result as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
