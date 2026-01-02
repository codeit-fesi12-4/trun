import { LoginModalReason } from "@/types/loginModal.type";
import { toast } from "sonner";

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

export const handleApiError = (
  error: unknown,
  options?: { onUnauthorized?: (reason?: LoginModalReason) => void },
) => {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      const reason: LoginModalReason =
        error.code === "INVALID_TOKEN" ? "INVALID_TOKEN" : "UNAUTHORIZED";
      options?.onUnauthorized?.(reason);

      return;
    } else {
      console.error(error);
      toast.error(error.message);
      return;
    }
  }
  toast.error("네트워크 오류가 발생했습니다.");
};
