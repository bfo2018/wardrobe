"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, MessageCircle } from "lucide-react";
import {
  FullBookingFields,
  type FullBookingFormData,
} from "@/components/forms/BookingFormFields";
import { submitToWebhook, getWhatsAppUrl } from "@/lib/webhook";
import { Button, ButtonLink } from "@/components/ui/Button";
import { brand, brandWhatsAppMessage } from "@/lib/brand";
import { trackBeginBooking, trackSubmitBooking, trackClickWhatsApp } from "@/lib/tracking";

export default function BookPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    trackBeginBooking("page");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FullBookingFormData>();

  const onSubmit = async (data: FullBookingFormData) => {
    setStatus("loading");
    try {
      await submitToWebhook({
        type: "booking",
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        eventDate: data.eventDate,
        eventType: data.eventType,
        outfitInterest: data.outfitInterest,
        tryOn: data.tryOn,
        message: data.message,
      });
      trackSubmitBooking("page");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 mx-auto rounded-full border-2 border-gold flex items-center justify-center mb-6">
            <span className="text-gold text-3xl">✓</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ivory mb-4">
            {brand.booking.successTitle}
          </h1>
          <p className="text-ivory/70 leading-relaxed">
            {brand.booking.successMessage}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppUrl(
                brandWhatsAppMessage(
                  "I just submitted a booking. Looking forward to hearing from you!"
                )
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickWhatsApp("booking-success")}
            >
              <Button variant="primary" size="lg" shimmer className="w-full sm:w-auto">
                <MessageCircle size={18} />
                Chat on WhatsApp
              </Button>
            </a>
            <ButtonLink href="/collections" variant="secondary" size="lg">
              Browse Collections
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Reserve Your Look
          </p>
          <h1 className="font-display text-4xl text-ivory">
            {brand.booking.modalTitle}
          </h1>
          <p className="mt-4 text-ivory/60">
            {brand.booking.modalSubtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 border border-gold/10 bg-charcoal-light rounded-sm"
        >
          <FullBookingFields register={register} errors={errors} />

          {status === "error" && (
            <div className="mt-6 p-4 border border-red-500/50 bg-red-500/10 text-sm text-red-300 text-center">
              We couldn&apos;t submit your booking. Please try again or reach us
              on WhatsApp.
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            shimmer
            className="w-full mt-8"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Submitting...
              </>
            ) : (
              "Submit Booking"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
