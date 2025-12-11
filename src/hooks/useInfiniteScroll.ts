import { useEffect, useRef } from "react";
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from "@tanstack/react-query";

interface UseInfiniteScrollProps {
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<unknown, Error>>;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  error,
  rootMargin = "200px 0px",
}: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !error && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, error, isLoading, isFetchingNextPage, rootMargin]);

  return { loadMoreRef };
};
