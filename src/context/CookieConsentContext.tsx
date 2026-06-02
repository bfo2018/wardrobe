"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ConsentStatus = "undecided" | "accepted" | "declined";

interface CookieConsentContextValue {
  consent: ConsentStatus;
  hasInteracted: boolean;
  acceptAll: () => void;
  declineAll: () => void;
  resetConsent: () => void;
}

const STORAGE_KEY = "wr_cookie_consent";

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return "undecided";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "declined") return stored;
  return "undecided";
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>("undecided");
  const [hasInteracted, setHasInteracted] = useState(true);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    setHasInteracted(stored !== "undecided");
  }, []);

  const acceptAll = useCallback(() => {
    setConsent("accepted");
    setHasInteracted(true);
    localStorage.setItem(STORAGE_KEY, "accepted");
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: "accepted" }));
  }, []);

  const declineAll = useCallback(() => {
    setConsent("declined");
    setHasInteracted(true);
    localStorage.setItem(STORAGE_KEY, "declined");
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: "declined" }));
  }, []);

  const resetConsent = useCallback(() => {
    setConsent("undecided");
    setHasInteracted(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{ consent, hasInteracted, acceptAll, declineAll, resetConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }
  return ctx;
}
