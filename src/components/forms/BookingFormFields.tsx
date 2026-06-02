"use client";

import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import { eventTypes, outfitCategories } from "@/lib/data";

export interface FullBookingFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  eventDate: string;
  eventType: string;
  outfitInterest: string;
  tryOn: string;
  message: string;
}

export interface MiniBookingFormData {
  fullName: string;
  phone: string;
  address: string;
  eventDate: string;
  eventType: string;
}

interface FieldProps {
  register: UseFormRegister<FullBookingFormData>;
  errors: FieldErrors<FullBookingFormData>;
}

export function FullBookingFields({ register, errors }: FieldProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-field" htmlFor="fullName">
            Full Name *
          </label>
          <input
            id="fullName"
            className={`input-field ${errors.fullName ? "input-error" : ""}`}
            {...register("fullName", { required: "Name is required" })}
          />
          {errors.fullName && (
            <p className="error-text">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="label-field" htmlFor="phone">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            className={`input-field ${errors.phone ? "input-error" : ""}`}
            placeholder="+91 98267 70724"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[+]?[\d\s-]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="error-text">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="label-field" htmlFor="email">
          Email Address *
        </label>
        <input
          id="email"
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
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      <div>
        <label className="label-field" htmlFor="address">
          Full Address *
        </label>
        <textarea
          id="address"
          rows={3}
          className={`input-field resize-none ${errors.address ? "input-error" : ""}`}
          placeholder="House / flat no., street, landmark, city, state, PIN code"
          {...register("address", {
            required: "Full address is required",
            minLength: {
              value: 15,
              message: "Please enter your complete delivery address",
            },
          })}
        />
        {errors.address && (
          <p className="error-text">{errors.address.message}</p>
        )}
        <p className="text-xs text-ivory/40 mt-1">
          Required for home try-on visits and outfit delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-field" htmlFor="eventDate">
            Event Date *
          </label>
          <input
            id="eventDate"
            type="date"
            className={`input-field ${errors.eventDate ? "input-error" : ""}`}
            {...register("eventDate", { required: "Event date is required" })}
          />
          {errors.eventDate && (
            <p className="error-text">{errors.eventDate.message}</p>
          )}
        </div>
        <div>
          <label className="label-field" htmlFor="eventType">
            Event Type *
          </label>
          <select
            id="eventType"
            className={`input-field ${errors.eventType ? "input-error" : ""}`}
            {...register("eventType", { required: "Select event type" })}
          >
            <option value="">Select...</option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="error-text">{errors.eventType.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-field" htmlFor="outfitInterest">
            Outfit Interest *
          </label>
          <select
            id="outfitInterest"
            className={`input-field ${errors.outfitInterest ? "input-error" : ""}`}
            {...register("outfitInterest", {
              required: "Select outfit category",
            })}
          >
            <option value="">Select...</option>
            {outfitCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.outfitInterest && (
            <p className="error-text">{errors.outfitInterest.message}</p>
          )}
        </div>
        <div>
          <label className="label-field" htmlFor="tryOn">
            Preferred Try-On *
          </label>
          <select
            id="tryOn"
            className={`input-field ${errors.tryOn ? "input-error" : ""}`}
            {...register("tryOn", { required: "Select try-on preference" })}
          >
            <option value="">Select...</option>
            <option value="In-Store">In-Store</option>
            <option value="Home Visit">Home Visit</option>
          </select>
          {errors.tryOn && (
            <p className="error-text">{errors.tryOn.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="label-field" htmlFor="message">
          Message / Special Requests
        </label>
        <textarea
          id="message"
          rows={4}
          className="input-field resize-none"
          placeholder="Size preferences, colour themes, delivery notes..."
          {...register("message")}
        />
      </div>
    </div>
  );
}

interface MiniFieldProps {
  register: UseFormRegister<MiniBookingFormData>;
  errors: FieldErrors<MiniBookingFormData>;
}

export function MiniBookingFields({ register, errors }: MiniFieldProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="label-field" htmlFor="modal-fullName">
          Full Name *
        </label>
        <input
          id="modal-fullName"
          className={`input-field ${errors.fullName ? "input-error" : ""}`}
          {...register("fullName", { required: "Name is required" })}
        />
        {errors.fullName && (
          <p className="error-text">{errors.fullName.message}</p>
        )}
      </div>
      <div>
        <label className="label-field" htmlFor="modal-phone">
          Phone *
        </label>
        <input
          id="modal-phone"
          type="tel"
          className={`input-field ${errors.phone ? "input-error" : ""}`}
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && (
          <p className="error-text">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <label className="label-field" htmlFor="modal-address">
          Full Address *
        </label>
        <textarea
          id="modal-address"
          rows={3}
          className={`input-field resize-none ${errors.address ? "input-error" : ""}`}
          placeholder="House / flat no., street, landmark, city, state, PIN"
          {...register("address", {
            required: "Full address is required",
            minLength: {
              value: 15,
              message: "Please enter your complete address",
            },
          })}
        />
        {errors.address && (
          <p className="error-text">{errors.address.message}</p>
        )}
      </div>
      <div>
        <label className="label-field" htmlFor="modal-eventDate">
          Event Date *
        </label>
        <input
          id="modal-eventDate"
          type="date"
          className={`input-field ${errors.eventDate ? "input-error" : ""}`}
          {...register("eventDate", { required: "Date is required" })}
        />
        {errors.eventDate && (
          <p className="error-text">{errors.eventDate.message}</p>
        )}
      </div>
      <div>
        <label className="label-field" htmlFor="modal-eventType">
          Event Type *
        </label>
        <select
          id="modal-eventType"
          className={`input-field ${errors.eventType ? "input-error" : ""}`}
          {...register("eventType", { required: "Select event type" })}
        >
          <option value="">Select...</option>
          {eventTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.eventType && (
          <p className="error-text">{errors.eventType.message}</p>
        )}
      </div>
    </div>
  );
}
