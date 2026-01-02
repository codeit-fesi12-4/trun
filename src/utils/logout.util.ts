import { QueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const logout = async (queryClient: QueryClient) => {
  try {
    await signOut({ redirect: false });
    queryClient.removeQueries({ queryKey: ["userProfile"] });
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("로그아웃 중 오류가 발생했습니다.");
  }
};
