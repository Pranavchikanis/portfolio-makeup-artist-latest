"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "For bridal makeup, we recommend booking at least 3–6 months in advance, especially during peak wedding season (October–December and May–July). For party or event bookings, 4–6 weeks notice is usually sufficient.",
  },
  {
    q: "Do you offer a trial session?",
    a: "Yes! All bridal packages include one complimentary trial session. This is where we test the look, do any adjustments, and ensure you're 100% comfortable with the final style before your big day.",
  },
  {
    q: "What products do you use?",
    a: "We exclusively use premium HD-photo-ready brands including MAC, Charlotte Tilbury, NARS, and Huda Beauty. All products are cruelty-free and skin-tone matched to your specific complexion.",
  },
  {
    q: "Is travel included?",
    a: "Travel within 20 km of our studio is complimentary. Beyond that, a travel fee of $1.50/km applies, which is automatically calculated in our Package Builder tool.",
  },
  {
    q: "How long does bridal makeup take?",
    a: "A full bridal application takes approximately 1.5–2.5 hours depending on complexity. We always recommend adding a buffer of 30 minutes before the ceremony starts.",
  },
  {
    q: "Can you do makeup for my entire bridal party?",
    a: "Absolutely! We offer bridesmaid packages and can accommodate groups of up to 8 people when booked well in advance. Please inquire early for group rates.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made more than 48 hours before the appointment will receive a full refund of the advance payment. Cancellations within 48 hours will forfeit the advance to cover scheduling loss.",
  },
  {
    q: "Do you work with all skin tones?",
    a: "Absolutely. We have extensive experience across all skin tones and undertones. We stock 40+ foundation shades to ensure a perfect match for every client.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-card border border-muted rounded-2xl overflow-hidden transition-all duration-200"
        >
          <button
            id={`faq-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-foreground hover:text-brand transition-colors"
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-brand shrink-0 ml-4 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
