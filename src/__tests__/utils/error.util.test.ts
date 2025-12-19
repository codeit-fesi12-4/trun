import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiError, handleApiError } from "@/utils/error.util";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("error.util", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("ApiError", () => {
    it("should create an ApiError with message and status", () => {
      const error = new ApiError({
        message: "Test error",
        status: 404,
      });

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toBe("Test error");
      expect(error.status).toBe(404);
      expect(error.name).toBe("ApiError");
      expect(error.code).toBeUndefined();
    });

    it("should create an ApiError with optional code", () => {
      const error = new ApiError({
        message: "Test error",
        status: 400,
        code: "INVALID_INPUT",
      });

      expect(error.message).toBe("Test error");
      expect(error.status).toBe(400);
      expect(error.code).toBe("INVALID_INPUT");
    });

    it("should create ApiError with different status codes", () => {
      const errors = [
        { status: 400, message: "Bad Request" },
        { status: 401, message: "Unauthorized" },
        { status: 403, message: "Forbidden" },
        { status: 404, message: "Not Found" },
        { status: 500, message: "Internal Server Error" },
      ];

      errors.forEach(({ status, message }) => {
        const error = new ApiError({ message, status });
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
      });
    });
  });

  describe("handleApiError", () => {
    it("should call onUnauthorized callback for 401 errors", async () => {
      const onUnauthorized = vi.fn();
      const error = new ApiError({
        message: "Unauthorized",
        status: 401,
      });

      await handleApiError(error, { onUnauthorized });

      expect(onUnauthorized).toHaveBeenCalledTimes(1);
      expect(toast.error).not.toHaveBeenCalled();
    });

    it("should show toast error for non-401 ApiErrors", async () => {
      const error = new ApiError({
        message: "Not Found",
        status: 404,
      });

      await handleApiError(error);

      expect(toast.error).toHaveBeenCalledWith("Not Found");
    });

    it("should show toast error for 400 status", async () => {
      const error = new ApiError({
        message: "Bad Request",
        status: 400,
      });

      await handleApiError(error);

      expect(toast.error).toHaveBeenCalledWith("Bad Request");
    });

    it("should show toast error for 500 status", async () => {
      const error = new ApiError({
        message: "Internal Server Error",
        status: 500,
      });

      await handleApiError(error);

      expect(toast.error).toHaveBeenCalledWith("Internal Server Error");
    });

    it("should show generic network error for non-ApiError instances", async () => {
      const error = new Error("Network failed");

      await handleApiError(error);

      expect(toast.error).toHaveBeenCalledWith("네트워크 오류가 발생했습니다.");
    });

    it("should handle null or undefined errors", async () => {
      await handleApiError(null);
      expect(toast.error).toHaveBeenCalledWith("네트워크 오류가 발생했습니다.");

      vi.clearAllMocks();

      await handleApiError(undefined);
      expect(toast.error).toHaveBeenCalledWith("네트워크 오류가 발생했습니다.");
    });

    it("should not call onUnauthorized for non-401 errors", async () => {
      const onUnauthorized = vi.fn();
      const error = new ApiError({
        message: "Forbidden",
        status: 403,
      });

      await handleApiError(error, { onUnauthorized });

      expect(onUnauthorized).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Forbidden");
    });

    it("should handle ApiError with code field", async () => {
      const error = new ApiError({
        message: "Validation failed",
        status: 400,
        code: "VALIDATION_ERROR",
      });

      await handleApiError(error);

      expect(toast.error).toHaveBeenCalledWith("Validation failed");
    });
  });
});