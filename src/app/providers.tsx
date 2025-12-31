"use client";

import { ProfileBootstrapper } from "@/hooks/useProfileBootstrapper";
import { unauthorizedHandler } from "@/utils/unauthorizedHandler.util";
import { handleApiError } from "@/utils/error.util";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: error => void handleApiError(error, { onUnauthorized }),
      }),
      mutationCache: new MutationCache({
        onError: error => void handleApiError(error, { onUnauthorized }),
      }),
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const onUnauthorized = unauthorizedHandler(queryClient);

    return queryClient;
  });
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
