/**
 * Unified tracking — fires events to Meta Pixel + Google Analytics 4.
 * Scripts only load when env IDs are set; calls are safe to make regardless.
 */

/* ---------- types ---------- */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

interface EventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

/* ---------- helpers ---------- */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

function fbq(eventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && window.fbq) {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

function gtag(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/* ---------- public API ---------- */

export function trackPageView(url?: string) {
  fbq("PageView");
  gtag("page_view", url ? { page_path: url } : undefined);
}

export function trackViewProduct(
  slug: string,
  name: string,
  category: string,
  price?: number
) {
  fbq("ViewContent", {
    content_name: name,
    content_category: category,
    content_ids: [slug],
    value: price,
    currency: "INR",
  });
  gtag("view_item", {
    item_id: slug,
    item_name: name,
    item_category: category,
    price,
    currency: "INR",
  });
}

export function trackBeginBooking(source: "modal" | "page", productName?: string) {
  fbq("InitiateCheckout", {
    content_name: productName ?? "General Booking",
    content_category: source,
  });
  gtag("begin_checkout", {
    item_name: productName ?? "General Booking",
    source,
  });
}

export function trackSubmitBooking(
  source: "modal" | "page",
  productName?: string,
  value?: number
) {
  fbq("Schedule", {
    content_name: productName ?? "General Booking",
    content_category: source,
    value,
    currency: "INR",
  });
  fbq("Lead", {
    content_name: productName ?? "General Booking",
    content_category: source,
  });
  gtag("generate_lead", {
    item_name: productName ?? "General Booking",
    source,
    value,
    currency: "INR",
  });
}

export function trackContactSubmit() {
  fbq("Contact");
  gtag("contact_form_submit");
}

export function trackClickWhatsApp(context?: string) {
  fbq("Contact", { content_name: "WhatsApp", content_category: context });
  gtag("click_whatsapp", { context });
}

export function trackClickCall() {
  fbq("Contact", { content_name: "Phone Call" });
  gtag("click_call");
}

export function trackClickBookNow(location: string) {
  gtag("click_book_now", { location });
}
