import { API_BASE_URL, TEAM_NAME } from "@/constants/env";

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(args: { message: string; status: number; code?: string }) {
    super(args.message);
    this.status = args.status;
    this.code = args.code;
    this.name = "ApiError";
  }
}

type ApiFetchOptions = RequestInit & {
  isFormData?: boolean;
};

export const apiFetch = async <T>(path: string, options: ApiFetchOptions = {}) => {
  const url = `${API_BASE_URL}${TEAM_NAME}${path}`;
  const { isFormData, headers, ...rest } = options;

  try {
    const response = await fetch(url, {
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
