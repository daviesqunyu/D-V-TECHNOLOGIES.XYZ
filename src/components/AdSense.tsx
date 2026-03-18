import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSenseProps = {
  adSlot?: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
};

// Only render on production (not on localhost / dev server)
const isProduction =
  typeof window !== "undefined" &&
  !["localhost", "127.0.0.1", "172.16.0.1"].some((h) =>
    window.location.hostname.startsWith(h)
  );

export function AdSense({
  adSlot = "9239832518",
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdSenseProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!isProduction || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense push error", e);
    }
  }, []);

  if (!isProduction) return null;

  return (
    <div className={`adsense-container overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4079400519004955"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
