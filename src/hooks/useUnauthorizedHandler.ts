"use client";

import { useLoginModalStore } from "@/stores/loginModal.store";
import { LoginModalReason } from "@/types/loginModal.type";
import { logout } from "@/utils/logout.util";

export const useUnauthorizedHandler = () => {
  const { setOpen } = useLoginModalStore();
  return (reason: LoginModalReason = "UNAUTHORIZED") => {
    void (async () => {
      setOpen(true, reason);
      await logout();
    })();
  };
};
