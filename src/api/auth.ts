import { useQuery } from "@tanstack/react-query";

import { TEAM_NAME } from "@/constants";
import { apiFetch } from "@/lib/apiClient";
import {
  LoginResponse,
  SigninRequest,
  SignupRequest,
  SignupResponse,
  UserProfile,
} from "@/types/auth.type";

const buildAuthPath = (path: string, teamName: string) => `/${teamName}/auths${path}`;

export const postSignup = (payload: SignupRequest, teamName: string = TEAM_NAME) =>
  apiFetch<SignupResponse>({
    path: buildAuthPath("/signup", teamName),
    method: "POST",
    body: JSON.stringify(payload),
  });

export const postSignin = (payload: SigninRequest, teamName: string = TEAM_NAME) =>
  apiFetch<LoginResponse>({
    path: buildAuthPath("/signin", teamName),
    method: "POST",
    body: JSON.stringify(payload),
  });

export const postSignout = (teamName: string = TEAM_NAME) =>
  apiFetch<void>({
    path: buildAuthPath("/signout", teamName),
    method: "POST",
  });

export const getUserProfile = (teamName: string = TEAM_NAME, token?: string | null) =>
  apiFetch<UserProfile>({
    path: buildAuthPath("/user", teamName),
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        token ?? (typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : "")
      }`,
    },
  });

export const useUserProfileQuery = ({
  teamName = TEAM_NAME,
  token,
  enabled = true,
}: {
  teamName?: string;
  token?: string | null;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["userProfile", teamName, token ?? "guest"],
    queryFn: () => getUserProfile(teamName, token),
    staleTime: 1000 * 60,
    enabled,
  });
