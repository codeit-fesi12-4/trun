import { create } from "zustand";

type LoginModalReason = "INVALID_TOKEN" | "UNAUTHORIZED";

type LoginModalState = {
  open: boolean;
  reason: LoginModalReason;
  setOpen: (open: boolean, reason?: LoginModalReason) => void;
};

export const useLoginModalStore = create<LoginModalState>(set => ({
  open: false,
  reason: "UNAUTHORIZED",
  setOpen: (open, reason = "UNAUTHORIZED") => set({ open, reason }),
}));
