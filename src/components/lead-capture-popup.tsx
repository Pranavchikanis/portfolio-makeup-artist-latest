"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { captureLead } from "@/app/actions";

export function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Prevent triggering if already submitted or dismissed in a previous session
    if (typeof window !== 'undefined') {
      const isDismissed = localStorage.getItem("leadCaptureDismissed");
      const isSubmitted = localStorage.getItem("leadCaptureSubmitted");
      if (isDismissed || isSubmitted) {
        setHasTriggered(true);
        return;
      }
    }

    if (hasTriggered) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Trigger when scrolling down 60% of the page
      if (scrollPosition + windowHeight >= documentHeight * 0.6) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  if (!isOpen) return null;

  function dismiss() {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem("leadCaptureDismissed", "true");
    }
  }

  async function handleSubmit(formData: FormData) {
    const result = await captureLead(formData);
    if (result && result.success) {
      setIsSubmitted(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem("leadCaptureSubmitted", "true");
      }
      setTimeout(() => setIsOpen(false), 2000);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative bg-card w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 border border-brand/20">
        <button 
          onClick={dismiss}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
        
        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-serif font-semibold text-green-600 mb-2">Thank you!</h3>
            <p className="text-muted-foreground">We'll be in touch soon with your free consultation.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand mb-2 block">Special Offer</span>
              <h3 className="text-2xl font-serif font-semibold mb-2">Book Your Trial Today</h3>
              <p className="text-muted-foreground text-sm">Sign up for my newsletter and get a free skin-prep consultation before your trial run!</p>
            </div>
            
            <form action={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="First Name" required className="flex h-11 w-full rounded-md border border-[var(--muted)] bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]" />
              <input type="email" name="email" placeholder="Email Address" required className="flex h-11 w-full rounded-md border border-[var(--muted)] bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]" />
              <Button type="submit" className="w-full">Get Free Consultation</Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-4">We respect your privacy.</p>
          </>
        )}
      </div>
    </div>
  );
}
