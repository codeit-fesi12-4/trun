import { apiFetch } from "@/lib/apiClient";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const logout = async (queryClient: QueryClient) => {
  try {
    await apiFetch(`/api/auth/signout`, { method: "POST" });
    queryClient.removeQueries({ queryKey: ["userProfile"] });
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("로그아웃 중 오류가 발생했습니다.");
  }
};
