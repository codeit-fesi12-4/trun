"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useUserProfileQuery } from "./queries/useUserQuery";
import { useEffect } from "react";

export function ProfileBootstrapper() {
  const { status } = useSession();
  const queryClient = useQueryClient();

  useUserProfileQuery(status === "authenticated");

  useEffect(() => {
    if (status === "unauthenticated") {
      queryClient.removeQueries({ queryKey: ["userProfile"] });
    }
  }, [status, queryClient]);

  return null;
}
