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
    <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6 animate-slide-up">
      <div className="mx-auto max-w-3xl rounded-xl border border-gold/20 bg-charcoal-light/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
            <Shield className="h-5 w-5 text-gold" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base sm:text-lg text-ivory">
                We value your privacy
              </h3>
              <button
                onClick={declineAll}
                className="sm:hidden p-1 text-ivory-muted hover:text-ivory transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-ivory-muted leading-relaxed">
              We use cookies and similar technologies to enhance your browsing
              experience, analyze site traffic, and personalize content. By
              clicking &ldquo;Accept All&rdquo;, you consent to the use of
              analytics cookies (Google Analytics &amp; Meta Pixel).
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 rounded-lg bg-gold text-charcoal font-semibold text-sm hover:bg-gold-light transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={declineAll}
                className="px-5 py-2.5 rounded-lg border border-gold/30 text-ivory text-sm hover:border-gold/60 hover:bg-charcoal-muted/50 transition-colors"
              >
                Decline Non-Essential
              </button>
              <a
                href="/privacy"
                className="text-xs text-gold/70 hover:text-gold underline underline-offset-2 transition-colors sm:ml-auto"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
