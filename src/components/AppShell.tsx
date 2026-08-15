import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { BottomTabBar } from "@/components/BottomTabBar";
import { useAppPlatform } from "@/hooks/use-app-platform";

// Secondary/legal pages keep the classic drawer navigation instead of the app tab bar.
const SECONDARY_PAGES = ["/privacy", "/terms", "/admin", "/payment-return"];

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { showTabBar } = useAppPlatform();

  const isSecondary = SECONDARY_PAGES.some((prefix) => pathname.startsWith(prefix));
  const showBottomNav = showTabBar && !isSecondary;

  return (
    <div className={showBottomNav ? "pb-[calc(env(safe-area-inset-bottom)+5rem)] lg:pb-0" : ""}>
      {children}
      {showBottomNav && <BottomTabBar />}
    </div>
  );
}
