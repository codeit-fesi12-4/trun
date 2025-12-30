"use client";

import { logout } from "@/utils/logout.util";
import { useLoginModalStore } from "@/stores/loginModal.store";
import { LoginModalReason } from "@/types/loginModal.type";
import { QueryClient } from "@tanstack/react-query";

export const unauthorizedHandler =
  (queryClient: QueryClient) =>
  (reason: LoginModalReason = "UNAUTHORIZED") => {
    void (async () => {
      const { setOpen } = useLoginModalStore.getState();
      setOpen(true, reason);
      await logout(queryClient);
    })();
  };
