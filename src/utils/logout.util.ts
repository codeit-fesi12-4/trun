import { postSignout } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export const logout = async () => {
  const { reset } = useAuthStore.getState();

  await postSignout();
  reset();

  toast.error("로그인 기간이 만료되었습니다. 다시 로그인 해주세요.");

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
