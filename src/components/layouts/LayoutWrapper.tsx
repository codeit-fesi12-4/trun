"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return isAuthPage ? (
    <>{children}</>
  ) : (
    <main className="mx-auto min-h-screen max-w-[1200px] bg-gray-50 px-4 pt-20 md:px-6 md:pt-25 lg:px-25">
      {children}
    </main>
  );
}
