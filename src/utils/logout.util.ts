import { useAuthStore } from "@/stores/auth.store";

export const logout = () => {
  const { reset } = useAuthStore.getState();

  reset();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
