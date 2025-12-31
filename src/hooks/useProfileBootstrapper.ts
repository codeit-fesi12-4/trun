"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useUserProfileQuery } from "./useUserQuery";
import { useEffect } from "react";

export function ProfileBootstrapper() {
  const { status } = useSession();
  const queryClient = useQueryClient();

  useUserProfileQuery(status === "authenticated");

  useEffect(() => {
    if (status === "unauthenticated") {
      queryClient.setQueryData(["userProfile"], undefined);
      queryClient.removeQueries({ queryKey: ["userProfile"] });
    }
  }, [status, queryClient]);

  return null;
}

// 로그인
// status -> authenticated -> true -> useUserProfileQuery 다시 가져오기
