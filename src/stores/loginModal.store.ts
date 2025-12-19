import { create } from "zustand";

type LoginModalState = { open: boolean; setOpen: (v: boolean) => void };

export const useLoginModalStore = create<LoginModalState>(set => ({
  open: false,
  setOpen: v => set({ open: v }),
}));
