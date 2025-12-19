import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiFetch, ApiError } from "@/lib/apiClient";

describe("apiClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("apiFetch - successful responses", () => {
    it("should return success result for successful fetch", async () => {
      const mockData = { id: 1, name: "Test" };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await apiFetch("/api/test");

      expect(result).toEqual({
        ok: true,
        status: 200,
        data: mockData,
      });
      expect(fetch).toHaveBeenCalledWith("/api/test", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should handle custom headers", async () => {
      const mockData = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      await apiFetch("/api/test", {
        headers: {
          Authorization: "Bearer token123",
        },
      });

      expect(fetch).toHaveBeenCalledWith("/api/test", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token123",
        },
      });
    });

    it("should not add Content-Type for FormData requests", async () => {
      const mockData = { uploaded: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => mockData,
      });

      await apiFetch("/api/upload", {
        method: "POST",
        isFormData: true,
        body: new FormData(),
      });

      expect(fetch).toHaveBeenCalledWith("/api/upload", {
        method: "POST",
        body: expect.any(FormData),
        headers: {},
      });
    });

    it("should pass through method and body", async () => {
      const mockData = { created: true };
      const body = JSON.stringify({ name: "test" });
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => mockData,
      });

      await apiFetch("/api/create", {
        method: "POST",
        body,
      });

      expect(fetch).toHaveBeenCalledWith("/api/create", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("apiFetch - error responses", () => {
    it("should return failure result for 400 status", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: "Bad request" }),
      });

      const result = await apiFetch("/api/test");

      expect(result).toEqual({
        ok: false,
        status: 400,
        message: "Bad request",
        code: undefined,
      });
    });

    it("should return failure result for 403 status", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ message: "Forbidden" }),
      });

      const result = await apiFetch("/api/test");

      expect(result).toEqual({
        ok: false,
        status: 403,
        message: "Forbidden",
        code: undefined,
      });
    });

    it("should extract error message from errors array", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          errors: [{ message: "Validation failed", code: "INVALID_INPUT" }],
        }),
      });

      const result = await apiFetch("/api/test");

      expect(result).toEqual({
        ok: false,
        status: 400,
        message: "Validation failed",
        code: "INVALID_INPUT",
      });
    });

    it("should throw ApiError for non-400/403 errors", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: "Server error" }),
      });

      await expect(apiFetch("/api/test")).rejects.toThrow(ApiError);
      await expect(apiFetch("/api/test")).rejects.toThrow("Server error");
    });

    it("should throw ApiError for 401 status", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ message: "Unauthorized" }),
      });

      await expect(apiFetch("/api/test")).rejects.toThrow(ApiError);
    });

    it("should throw ApiError for 404 status", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ message: "Not found" }),
      });

      await expect(apiFetch("/api/test")).rejects.toThrow(ApiError);
    });

    it("should use default error message when none provided", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({}),
      });

      const result = await apiFetch("/api/test");

      expect(result).toEqual({
        ok: false,
        status: 400,
        message: "요청 중 오류가 발생했습니다.",
        code: undefined,
      });
    });

    it("should handle network errors", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      await expect(apiFetch("/api/test")).rejects.toThrow("Network error");
    });

    it("should handle JSON parse errors", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      await expect(apiFetch("/api/test")).rejects.toThrow("Invalid JSON");
    });
  });

  describe("apiFetch - edge cases", () => {
    it("should handle empty response body", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
        json: async () => null,
      });

      const result = await apiFetch("/api/test");

      expect(result).toEqual({
        ok: true,
        status: 204,
        data: null,
      });
    });

    it("should preserve custom request options", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: "test" }),
      });

      await apiFetch("/api/test", {
        method: "PUT",
        cache: "no-cache" as RequestCache,
        credentials: "include",
      });

      expect(fetch).toHaveBeenCalledWith("/api/test", {
        method: "PUT",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should handle error code extraction", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          code: "VALIDATION_ERROR",
          message: "Invalid input",
        }),
      });

      const result = await apiFetch("/api/test");

      expect(result).toMatchObject({
        ok: false,
        code: "VALIDATION_ERROR",
      });
    });
  });
});