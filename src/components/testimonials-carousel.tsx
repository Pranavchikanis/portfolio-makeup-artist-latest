"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  { id: 1, name: "Sarah Jenkins", role: "Bride", text: "Absolutely stunning work! My makeup stayed flawless for 14 hours through tears, sweat, and dancing. Highly recommended!" },
  { id: 2, name: "Ayesha Malik", role: "Event Client", text: "She understood exactly what I wanted. I've never felt so confident and beautiful. The skin prep is next level." },
  { id: 3, name: "Emily Chen", role: "Bride", text: "Professional, punctual, and an absolute artist. She made my entire bridal party look cohesive yet distinct." },
  { id: 4, name: "Jessica R.", role: "Editorial Client", text: "My go-to makeup artist for all brand photoshoots. Unbeatable attention to detail." }
];

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {reviews.map((review) => (
            <div key={review.id} className="min-w-0 pl-6 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <div className="p-8 rounded-2xl bg-card border border-muted h-full flex flex-col shadow-sm">
                <div className="flex gap-1 mb-4 text-brand">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-card-foreground text-sm italic mb-6 flex-grow">"{review.text}"</p>
                <div>
                  <h4 className="font-semibold text-card-foreground">{review.name}</h4>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={scrollPrev} 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-muted shadow-sm hover:text-brand transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={scrollNext} 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background border border-muted shadow-sm hover:text-brand transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}
