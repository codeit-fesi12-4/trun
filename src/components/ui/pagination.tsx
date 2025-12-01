import * as React from "react";
import { MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-state={isActive ? "active" : "inactive"}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 font-semibold hover:text-gray-800 sm:mx-1",
        isActive ? "border text-gray-800" : "text-gray-200",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("flex h-auto items-center justify-center gap-1 p-0", className)}
      {...props}
    >
      <svg
        className="h-6 w-6 sm:h-8 sm:w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5347 12.7151C8.2346 12.3975 8.2346 11.9008 8.53469 11.5832L13.994 5.8047C14.506 5.26275 15.4171 5.6251 15.4171 6.37066V17.9276C15.4171 18.6732 14.506 19.0355 13.994 18.4936L8.5347 12.7151Z"
          fill="currentColor"
        />
      </svg>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <svg
        className="h-6 w-6 sm:h-8 sm:w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.8833 12.7151C15.1834 12.3975 15.1834 11.9008 14.8833 11.5832L9.42402 5.8047C8.91201 5.26275 8.00083 5.6251 8.00083 6.37066V17.9276C8.00083 18.6732 8.91201 19.0355 9.42401 18.4936L14.8833 12.7151Z"
          fill="currentColor"
        />
      </svg>
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
