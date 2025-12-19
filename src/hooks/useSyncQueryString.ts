import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useSyncQueryString = (queryString: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

  useEffect(() => {
    const current = searchParams.toString();
    if (current !== queryString) {
      router.replace(nextUrl);
    }
  }, [queryString, nextUrl, searchParams, router]);

  return;
};

export default useSyncQueryString;
