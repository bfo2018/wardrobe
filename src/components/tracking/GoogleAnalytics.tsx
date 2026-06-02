"use client";

import Script from "next/script";
import { GA4_ID } from "@/lib/tracking";
import { useCookieConsent } from "@/context/CookieConsentContext";

export function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  if (!GA4_ID || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
          });
          window.gtag = gtag;
        `}
      </Script>
    </>
  );
}
