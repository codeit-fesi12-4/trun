"use client";

import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

interface OverlayScrollbarProviderProps {
  children: React.ReactNode;
}

const OverlayScrollbarProvider = ({ children }: OverlayScrollbarProviderProps) => {
  useEffect(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: {
        theme: "os-theme-dark",
        autoHide: "never",
      },
      overflow: {
        x: "hidden",
        y: "scroll",
      },
    });

    return () => {
      osInstance.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default OverlayScrollbarProvider;
