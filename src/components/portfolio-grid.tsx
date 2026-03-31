"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const categories = ["All", "Bridal", "Party", "Editorial"];

const portfolioItems = [
  { id: 1, category: "Bridal", src: "/images/hero_bridal_makeup.png", alt: "Bridal glowing makeup" },
  { id: 2, category: "Party", src: "/images/portfolio_party_makeup.png", alt: "Glamorous party makeup" },
  { id: 3, category: "Bridal", src: "/images/makeup_after.png", alt: "Bridal nude lip makeup" },
  { id: 4, category: "Editorial", src: "/images/hero_bridal_makeup.png", alt: "Editorial styling" },
  { id: 5, category: "Party", src: "/images/portfolio_party_makeup.png", alt: "Event glam" },
  { id: 6, category: "Bridal", src: "/images/makeup_after.png", alt: "Flawless base" },
];

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + filteredItems.length) % filteredItems.length : null),
    [filteredItems.length]);
  const nextImage = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % filteredItems.length : null),
    [filteredItems.length]);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-brand text-brand-foreground border-brand shadow-md"
                : "bg-background text-foreground border-muted hover:border-brand hover:text-brand"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={600}
              height={800}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
              <ZoomIn className="w-8 h-8 text-white" />
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={(e) => { e.stopPropagation(); window.location.href = `/book?look=${item.id}`; }}
              >
                Get This Look
              </Button>
            </div>
            <div className="absolute top-3 right-3 bg-background/90 text-foreground px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.category}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 rounded-full p-3 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredItems[lightboxIndex].src}
              alt={filteredItems[lightboxIndex].alt}
              width={1200}
              height={1600}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              priority
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {lightboxIndex + 1} / {filteredItems.length} · {filteredItems[lightboxIndex].category}
            </div>
            <div className="mt-4 text-center">
              <Button
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={() => window.location.href = `/book?look=${filteredItems[lightboxIndex!].id}`}
              >
                Book This Look
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
