"use client";

import { ProfileBootstrapper } from "@/hooks/useProfileBootstrapper";
import { useUnauthorizedHandler } from "@/hooks/useUnauthorizedHandler";
import { handleApiError } from "@/utils/error.util";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
            void handleApiError(error, { onUnauthorized: handleUnauthorized });
          },
        }),
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
