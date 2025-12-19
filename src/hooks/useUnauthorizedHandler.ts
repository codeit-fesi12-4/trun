"use client";

import { useLoginModalStore } from "@/stores/loginModal.store";
import { logout } from "@/utils/logout.util";

export const useUnauthorizedHandler = () => {
  const { setOpen } = useLoginModalStore();
  return () => {
    void (async () => {
      await logout();
      setOpen(true);
    })();
  };
};
