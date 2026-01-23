"use client";

import { useUserProfileQuery } from "./queries/useUserQuery";

export function ProfileBootstrapper() {
  useUserProfileQuery();
  return null;
}
