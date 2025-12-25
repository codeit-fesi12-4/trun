"use client";

import { ProfileBootstrapper } from "@/hooks/useProfileBootstrapper";
import { useUnauthorizedHandler } from "@/hooks/useUnauthorizedHandler";
import { handleApiError } from "@/utils/error.util";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const handleUnauthorized = useUnauthorizedHandler();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: error => {
            console.warn("provider 에러 처리");
            void handleApiError(error, { onUnauthorized: handleUnauthorized });
          },
        }),
        mutationCache: new MutationCache({
          onError: error => {
            console.warn("mutation 에러 처리");
            void handleApiError(error, { onUnauthorized: handleUnauthorized });
          },
        }),
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      }),
  );
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
