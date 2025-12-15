import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { pretendard } from "./font";
import Header from "@/components/layouts/Header";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "같이달림 | 함께 달리는 즐거움",
  description: "같이달림에서 다양한 러닝 모임을 찾아보고 함께 달려보세요.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} bg-background antialiased`}>
        <Providers>
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: "var(--toast-font-size)",
                padding: "var(--toast-padding)",
                minHeight: "var(--toast-min-height)",
                borderRadius: "12px",
                width: "var(--toast-width)",
                marginLeft: "auto",
                marginRight: "auto",
                borderColor: "transparent",
                boxShadow: "0 0 5px 5px rgb(176, 239, 209)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
