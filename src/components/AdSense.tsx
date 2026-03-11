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

export function AdSense({
  adSlot = "9239832518",
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.error("AdSense push error", e);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef}
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
