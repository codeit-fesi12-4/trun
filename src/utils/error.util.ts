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
      if (error.code === "UNAUTHORIZED") {
        return;
      }
      if (error.code === "INVALID_TOKEN") {
        options?.onUnauthorized?.("INVALID_TOKEN");
        return;
      }
      options?.onUnauthorized?.("UNAUTHORIZED");
      return;
    } else {
      console.error(error);
      toast.error(error.message);
      return;
    }
  }
  toast.error("네트워크 오류가 발생했습니다.");
};
