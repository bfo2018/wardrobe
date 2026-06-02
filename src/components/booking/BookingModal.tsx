"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";
import {
  MiniBookingFields,
  type MiniBookingFormData,
} from "@/components/forms/BookingFormFields";
import { submitToWebhook, getWhatsAppUrl } from "@/lib/webhook";
import { brand, brandWhatsAppMessage } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { trackBeginBooking, trackSubmitBooking, trackClickWhatsApp } from "@/lib/tracking";

export function BookingModal() {
  const { isOpen, closeModal, selections } = useBookingModal();
  const { productSlug, productName, occasion, size, rentalDuration, rentalPrice } =
    selections;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MiniBookingFormData>();

  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      trackBeginBooking("modal", productName);
    }
  }, [isOpen, productName]);

  const onSubmit = async (data: MiniBookingFormData) => {
    setStatus("loading");
    try {
      await submitToWebhook({
        type: "modal",
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        eventDate: data.eventDate,
        eventType: data.eventType,
        productSlug,
        productName,
        occasion,
        size,
        rentalDuration,
        rentalPrice,
      });
      trackSubmitBooking("modal", productName);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStatus("idle");
      reset();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-charcoal-light border-l border-gold/20 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold mb-2">
                    Outfit booking
                  </p>
                  <h2 className="font-display text-2xl text-ivory leading-snug">
                    {brand.booking.modalTitle}
                  </h2>
                  <p className="text-sm text-ivory/60 mt-2 max-w-sm">
                    {brand.booking.modalSubtitle}
                  </p>
                  {productName && (
                    <p className="text-sm text-gold mt-3 font-medium">
                      {productName}
                    </p>
                  )}
                  {(occasion || size || rentalDuration) && (
                    <dl className="mt-3 space-y-1 text-xs text-ivory/60">
                      {occasion && (
                        <div className="flex gap-2">
                          <dt className="text-gold/80">Occasion:</dt>
                          <dd>{occasion}</dd>
                        </div>
                      )}
                      {size && (
                        <div className="flex gap-2">
                          <dt className="text-gold/80">Size:</dt>
                          <dd>{size}</dd>
                        </div>
                      )}
                      {rentalDuration && (
                        <div className="flex gap-2">
                          <dt className="text-gold/80">Duration:</dt>
                          <dd>
                            {rentalDuration}
                            {rentalPrice ? ` · ${rentalPrice}` : ""}
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-ivory/60 hover:text-gold p-1 flex-shrink-0"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 mx-auto rounded-full border-2 border-gold bg-gold/10 flex items-center justify-center mb-5">
                    <span className="text-gold text-3xl">✓</span>
                  </div>
                  <h3 className="font-display text-2xl text-ivory mb-3">
                    {brand.booking.successTitle}
                  </h3>
                  <p className="text-sm text-ivory/70 leading-relaxed mb-8 max-w-xs mx-auto">
                    {brand.booking.successMessage}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={handleClose}
                    >
                      Done
                    </Button>
                    <a
                      href={getWhatsAppUrl(
                        brandWhatsAppMessage(
                          "I just reserved an outfit on your website."
                        )
                      )}
                      onClick={() => trackClickWhatsApp("booking-success")}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="md" className="w-full">
                        Chat on WhatsApp
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <MiniBookingFields register={register} errors={errors} />
                  {status === "error" && (
                    <p className="error-text mt-4 text-center">
                      We couldn&apos;t send your booking right now. Please try
                      again or reach us on WhatsApp.
                    </p>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    shimmer
                    className="w-full mt-6"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending your booking...
                      </>
                    ) : (
                      brand.booking.modalSubmit
                    )}
                  </Button>
                  <p className="text-xs text-ivory/40 text-center mt-4">
                    Need more details?{" "}
                    <Link
                      href="/book"
                      onClick={handleClose}
                      className="text-gold hover:underline"
                    >
                      Use the full booking form
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
