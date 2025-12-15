import { create } from "zustand";

type UserState = {
  nickname: string;
  setNickname: (nickname: string) => void;
};

const useUserStore = create<UserState>(set => ({
  nickname: "",
  setNickname: nickname => set({ nickname }),
}));

export default useUserStore;
