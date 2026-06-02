"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface ProductBookingSelections {
  productSlug?: string;
  productName?: string;
  occasion?: string;
  size?: string;
  rentalDuration?: string;
  rentalPrice?: string;
}

interface BookingModalContextValue {
  isOpen: boolean;
  selections: ProductBookingSelections;
  openModal: (opts?: ProductBookingSelections) => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selections, setSelections] = useState<ProductBookingSelections>({});

  const openModal = useCallback((opts?: ProductBookingSelections) => {
    setSelections(opts ?? {});
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelections({});
  }, []);

  return (
    <BookingModalContext.Provider
      value={{ isOpen, selections, openModal, closeModal }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}
