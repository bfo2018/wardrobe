"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/tracking";
import { useCookieConsent } from "@/context/CookieConsentContext";

export function PageViewTracker() {
  const pathname = usePathname();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent === "accepted") {
      trackPageView(pathname);
    }
  }, [pathname, consent]);

  return null;
}
