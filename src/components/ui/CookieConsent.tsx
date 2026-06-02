"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { Shield, X } from "lucide-react";

export function CookieConsent() {
  const { consent, hasInteracted, acceptAll, declineAll } = useCookieConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasInteracted && consent === "undecided") {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted, consent]);

  if (hasInteracted || consent !== "undecided" || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-slide-up max-w-sm w-[calc(100%-2rem)]">
      <div className="rounded-xl border border-gold/20 bg-charcoal-light/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-4">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-gold shrink-0" />
            <h3 className="font-display text-sm text-ivory whitespace-nowrap">
              We value your privacy
            </h3>
          </div>
          <button
            onClick={declineAll}
            className="p-1 text-ivory-muted hover:text-ivory transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-xs text-ivory-muted leading-relaxed mb-3">
          We use cookies to analyze traffic and personalize content.{" "}
          <a
            href="/privacy"
            className="text-gold/70 hover:text-gold underline underline-offset-2 transition-colors"
          >
            Learn more
          </a>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2 rounded-lg bg-gold text-charcoal font-semibold text-xs whitespace-nowrap hover:bg-gold-light transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={declineAll}
            className="flex-1 px-4 py-2 rounded-lg border border-gold/30 text-ivory text-xs whitespace-nowrap hover:border-gold/60 hover:bg-charcoal-muted/50 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
