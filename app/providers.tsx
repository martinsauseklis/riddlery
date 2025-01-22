"use client";

import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Analytics } from "./events/events";
import { useEffect, createContext, useState } from "react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export const AnalyticsContext = createContext();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [analytics, setAnalytics] = useState();

  useEffect(() => {
    setAnalytics(Analytics.instantiate());
  }, []);

  return (
    <HeroUIProvider navigate={router.push}>
      <AnalyticsContext.Provider value={analytics}>
        {children}
      </AnalyticsContext.Provider>
    </HeroUIProvider>
  );
}
