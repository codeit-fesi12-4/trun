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

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    toast.error(error.message);
    return;
  }
  toast.error("네트워크 오류가 발생했습니다.");
};
