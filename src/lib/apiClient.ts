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

      // 401 에러 (인증 실패) 시 NextAuth 세션 무효화 (events.signOut에서 쿠키도 자동 삭제됨)
      if (response.status === 401 && typeof window !== "undefined") {
        try {
          // NextAuth 세션 삭제 (events.signOut에서 쿠키도 자동 삭제됨)
          const { signOut } = await import("next-auth/react");
          const { toast } = await import("sonner");
          toast.info("세션이 만료되어 자동으로 로그아웃됩니다.");
          await signOut({ redirect: false });
        } catch (signOutError) {
          console.error("Sign out error:", signOutError);
        }
      }

      throw new ApiError({ message, status: response.status, code });
    }

    return result as T;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
