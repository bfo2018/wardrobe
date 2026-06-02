import { brand } from "@/lib/brand";

export interface BookingPayload {
  type: "booking" | "contact" | "modal";
  fullName?: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  eventDate?: string;
  eventType?: string;
  outfitInterest?: string;
  tryOn?: string;
  message?: string;
  productSlug?: string;
  productName?: string;
  occasion?: string;
  size?: string;
  rentalDuration?: string;
  rentalPrice?: string;
  submittedAt: string;
}

const WEBHOOK_TIMEOUT_MS = 8000;

function isWebhookConfigured(url: string | undefined): boolean {
  if (!url?.trim()) return false;
  const lower = url.toLowerCase();
  return (
    !lower.includes("your-n8n-instance") &&
    !lower.includes("example.com") &&
    lower.startsWith("http")
  );
}

/**
 * Posts booking data to n8n. Skips network call when URL is not configured
 * (avoids infinite loading on placeholder .env). Uses an 8s timeout otherwise.
 */
export async function submitToWebhook(
  data: Omit<BookingPayload, "submittedAt">
): Promise<void> {
  const url = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  if (!isWebhookConfigured(url)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return;
  }

  const payload: BookingPayload = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(url!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        "Booking request timed out. Please try again or message us on WhatsApp."
      );
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function getWhatsAppUrl(message?: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || brand.whatsappNumber;
  const base = `https://wa.me/${number}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}
