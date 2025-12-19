import { describe, it, expect, vi, beforeEach } from "vitest";
import { logout } from "@/utils/logout.util";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

vi.mock("next-auth/react", () => ({
  signOut: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("logout.util", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call signOut with redirect false", async () => {
    vi.mocked(signOut).mockResolvedValue(undefined as any);

    await logout();

    expect(signOut).toHaveBeenCalledWith({ redirect: false });
    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it("should not show error toast on successful logout", async () => {
    vi.mocked(signOut).mockResolvedValue(undefined as any);

    await logout();

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should handle logout errors gracefully", async () => {
    const error = new Error("Logout failed");
    vi.mocked(signOut).mockRejectedValue(error);

    await logout();

    expect(toast.error).toHaveBeenCalledWith("로그아웃 중 오류가 발생했습니다.");
  });

  it("should log error to console on failure", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Network error");
    vi.mocked(signOut).mockRejectedValue(error);

    await logout();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Logout error:", error);
    consoleErrorSpy.mockRestore();
  });

  it("should handle signOut rejection with non-Error object", async () => {
    vi.mocked(signOut).mockRejectedValue("String error");

    await logout();

    expect(toast.error).toHaveBeenCalledWith("로그아웃 중 오류가 발생했습니다.");
  });
});