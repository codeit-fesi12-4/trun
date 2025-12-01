import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserProfile } from "@/types/auth";

type AuthState = {
  token: string | null;
  user: UserProfile | null;
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile | null) => void;
  reset: () => void;
};

const safeGetToken = () =>
  typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

const safeGetUser = () => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem("user");
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  devtools(
    set => ({
      token: safeGetToken(),
      user: safeGetUser(),
      setToken: token => {
        set({ token });
        if (typeof window !== "undefined") {
          if (token) {
            window.localStorage.setItem("token", token);
          } else {
            window.localStorage.removeItem("token");
          }
        }
      },
      setUser: user => {
        set({ user });
        if (typeof window !== "undefined") {
          if (user) {
            window.localStorage.setItem("user", JSON.stringify(user));
          } else {
            window.localStorage.removeItem("user");
          }
        }
      },
      reset: () => {
        set({ token: null, user: null });
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");
        }
      },
    }),
    { name: "authStore" },
  ),
);
