"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useLoginRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const redirectToLogin = () => {
    const current = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    router.push(`/login?redirect=${encodeURIComponent(current)}`);
  };
  return { redirectToLogin };
};

export default useLoginRedirect;
