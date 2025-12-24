import { signOut } from "next-auth/react";
import { toast } from "sonner";

export const logout = async () => {
  try {
    // NextAuth 세션 삭제 (events.signOut에서 쿠키도 자동 삭제됨)
    await signOut({ redirect: false });
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("로그아웃 중 오류가 발생했습니다.");
  }
};
