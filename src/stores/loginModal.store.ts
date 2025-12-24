import { create } from "zustand";

type LoginModalState = {
  open: boolean;
  reason: string;
  setOpen: (open: boolean, reason?: string) => void;
};

export const useLoginModalStore = create<LoginModalState>(set => ({
  open: false,
  reason: "UNAUTHORIZED",
  setOpen: (open, reason = "UNAUTHORIZED") => set({ open, reason }),
}));
