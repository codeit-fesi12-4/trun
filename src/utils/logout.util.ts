import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const logout = async () => {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("로그아웃 중 오류가 발생했습니다.");
  }
};
