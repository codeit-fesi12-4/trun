"use client";

import { useUserProfileQuery } from "@/hooks/useUserQuery";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

function ProfileBootstrapper() {
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

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ProfileBootstrapper />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
