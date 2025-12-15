"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isHomePage = pathname === "/";

  return isAuthPage ? (
    <div className="pt-[50px] md:pt-[88px]">{children}</div>
  ) : isHomePage ? (
    <div className="pt-[50px] md:pt-[88px]">{children}</div>
  ) : (
    <div className="px-4 pt-[74px] pb-6 sm:px-6 sm:pt-[120px] sm:pb-8 md:pt-[136px] md:pb-12">
      <main className="mx-auto max-w-[1200px]">{children}</main>
    </div>
  );
}
