"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, MapPin, Phone, Mail, Instagram } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { trackContactSubmit, trackClickCall } from "@/lib/tracking";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const hours = [
  { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
  { day: "Saturday", time: "10:00 AM – 9:00 PM" },
  { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  { day: "By Appointment", time: "Home visits available" },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      await submitToWebhook({
        type: "contact",
        name: data.name,
        email: data.email,
        message: data.message,
      });
      trackContactSubmit();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-28 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-ivory">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="label-field">Visit Us</p>
                <p className="text-ivory/80">
                  {brand.address.line1}
                  <br />
                  {brand.address.line2}
                  <br />
                  {brand.address.city}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="label-field">Call</p>
                <a
                  href={`tel:${brand.phoneTel}`}
                  className="text-ivory/80 hover:text-gold"
                  onClick={() => trackClickCall()}
                >
                  {brand.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="label-field">Email</p>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-ivory/80 hover:text-gold"
                >
                  {brand.email}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Instagram className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="label-field">Instagram</p>
                <a
                  href={brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/80 hover:text-gold"
                >
                  {brand.instagram}
                </a>
              </div>
            </div>

            <div>
              <p className="label-field mb-4">Business Hours</p>
              <table className="w-full text-sm">
                <tbody>
                  {hours.map((row) => (
                    <tr key={row.day} className="border-b border-gold/10">
                      <td className="py-3 text-ivory/80">{row.day}</td>
                      <td className="py-3 text-ivory/60 text-right">
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-sm border border-gold/10">
              <iframe
                title={`${brand.name} store location`}
                src={brand.mapsEmbedUrl}
                className="w-full h-full border-0 grayscale opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            {status === "success" ? (
              <div className="p-8 border border-gold/30 bg-charcoal-light text-center h-full flex flex-col justify-center">
                <p className="font-display text-2xl text-gold mb-2">
                  Message Sent!
                </p>
                <p className="text-ivory/60">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 border border-gold/10 bg-charcoal-light space-y-5"
              >
                <h2 className="font-display text-xl text-ivory mb-2">
                  Send a Message
                </h2>
                <div>
                  <label className="label-field" htmlFor="name">
                    Name *
                  </label>
                  <input
                    id="name"
                    className={`input-field ${errors.name ? "input-error" : ""}`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="error-text">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="label-field" htmlFor="contact-email">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`input-field ${errors.email ? "input-error" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error-text">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="label-field" htmlFor="contact-message">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className={`input-field resize-none ${errors.message ? "input-error" : ""}`}
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <p className="error-text">{errors.message.message}</p>
                  )}
                </div>
                {status === "error" && (
                  <p className="error-text text-center">
                    Failed to send. Please try again.
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  shimmer
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
