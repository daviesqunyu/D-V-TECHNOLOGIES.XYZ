import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: { initData?: string; initDataUnsafe?: Record<string, unknown>; ready?: () => void };
    };
  }
}

export function useAppPlatform() {
  const isMobile = useIsMobile();
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const viaQuery =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("tgWebAppStartParam");
    const viaSDK = typeof window !== "undefined" && !!window.Telegram?.WebApp?.initData;
    const viaUA =
      typeof navigator !== "undefined" && /Telegram\/(\d+)/.test(navigator.userAgent);
    setIsTelegram(!!(viaQuery || viaSDK || viaUA));
  }, []);

  return {
    isMobile,
    isTelegram,
    // Bottom app-style tab bar: mobile devices and Telegram Mini App clients.
    showTabBar: isMobile || isTelegram,
  };
}
