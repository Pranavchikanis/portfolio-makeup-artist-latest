"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw } from "lucide-react";

type Look = {
  id: string;
  name: string;
  description: string;
  overlayStyle: {
    lipColor: string;
    eyeshadow: string;
    blush: string;
    contour: string;
  };
};

const looks: Look[] = [
  {
    id: "bridal-nude",
    name: "Bridal Nude",
    description: "Soft, radiant skin with nude lips and a bronzed glow",
    overlayStyle: {
      lipColor: "rgba(210, 150, 130, 0.65)",
      eyeshadow: "rgba(200, 170, 140, 0.4)",
      blush: "rgba(230, 160, 130, 0.35)",
      contour: "rgba(150, 100, 80, 0.25)",
    },
  },
  {
    id: "smoky-glam",
    name: "Smoky Evening Glam",
    description: "Dramatic smoky eyes with bold lashes and a berry lip",
    overlayStyle: {
      lipColor: "rgba(140, 60, 90, 0.7)",
      eyeshadow: "rgba(40, 30, 50, 0.55)",
      blush: "rgba(200, 100, 100, 0.3)",
      contour: "rgba(100, 70, 60, 0.3)",
    },
  },
  {
    id: "editorial-bold",
    name: "Editorial Bold",
    description: "High-impact colour with defined arches and graphic liner",
    overlayStyle: {
      lipColor: "rgba(200, 50, 50, 0.75)",
      eyeshadow: "rgba(80, 50, 130, 0.5)",
      blush: "rgba(220, 120, 80, 0.35)",
      contour: "rgba(100, 60, 50, 0.3)",
    },
  },
  {
    id: "fresh-glow",
    name: "Fresh No-Makeup Glow",
    description: "Dewy skin with mascara and barely-there tint",
    overlayStyle: {
      lipColor: "rgba(220, 180, 165, 0.5)",
      eyeshadow: "rgba(220, 200, 180, 0.25)",
      blush: "rgba(240, 180, 160, 0.2)",
      contour: "rgba(180, 140, 120, 0.15)",
    },
  },
];

export function ARTryOn() {
  const [activeLook, setActiveLook] = useState<Look | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  function applyLook(look: Look) {
    setIsApplying(true);
    setTimeout(() => {
      setActiveLook(look);
      setIsApplying(false);
    }, 600);
  }

  function reset() {
    setIsApplying(true);
    setTimeout(() => {
      setActiveLook(null);
      setIsApplying(false);
    }, 400);
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Face Preview */}
        <div className="sticky top-24">
          <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl bg-muted border-4 border-background">
            <Image
              src="/images/ar_face_neutral.png"
              alt="Virtual try-on model"
              fill
              className="object-cover"
              priority
            />

            {/* Makeup overlays via CSS compositing */}
            {activeLook && (
              <div className={`absolute inset-0 transition-opacity duration-500 ${isApplying ? "opacity-0" : "opacity-100"}`}>
                {/* Contour layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 15% 15% at 28% 42%, ${activeLook.overlayStyle.contour} 0%, transparent 70%), radial-gradient(ellipse 15% 15% at 72% 42%, ${activeLook.overlayStyle.contour} 0%, transparent 70%)`,
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Blush layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 10% 8% at 33% 34%, ${activeLook.overlayStyle.blush} 0%, transparent 100%), radial-gradient(ellipse 10% 8% at 67% 34%, ${activeLook.overlayStyle.blush} 0%, transparent 100%)`,
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Eye shadow layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 8% 4% at 38% 28.5%, ${activeLook.overlayStyle.eyeshadow} 0%, transparent 100%), radial-gradient(ellipse 8% 4% at 62% 28.5%, ${activeLook.overlayStyle.eyeshadow} 0%, transparent 100%)`,
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Lip layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 6.5% 2% at 50% 43%, ${activeLook.overlayStyle.lipColor} 0%, transparent 100%)`,
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            )}

            {isApplying && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-brand animate-pulse" />
              </div>
            )}

            {/* Look label */}
            {activeLook && !isApplying && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm whitespace-nowrap">
                {activeLook.name}
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              disabled={!activeLook || isApplying}
              className="gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              size="sm"
              className="bg-brand text-brand-foreground hover:bg-brand/90 gap-1"
              disabled={!activeLook}
              onClick={() => activeLook && (window.location.href = `/book?service=${activeLook.id}`)}
            >
              <Sparkles className="w-4 h-4" />
              Book This Look
            </Button>
          </div>
        </div>

        {/* Look Selector */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-serif mb-6">Select a Look to Try</h3>
          {looks.map((look) => (
            <button
              key={look.id}
              onClick={() => applyLook(look)}
              className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
                activeLook?.id === look.id
                  ? "border-brand bg-brand/5 shadow-md"
                  : "border-muted bg-card hover:border-brand/50 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Color swatches */}
                <div className="flex gap-1.5 pt-1 shrink-0">
                  <div
                    className="w-5 h-5 rounded-full border border-white/50"
                    style={{ backgroundColor: look.overlayStyle.lipColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white/50"
                    style={{ backgroundColor: look.overlayStyle.eyeshadow }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white/50"
                    style={{ backgroundColor: look.overlayStyle.blush }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{look.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{look.description}</p>
                </div>
              </div>
            </button>
          ))}
          <div className="mt-6 p-4 rounded-xl bg-muted/40 text-xs text-muted-foreground">
            <strong>✨ AR Preview Mode:</strong> This is a simulated makeup overlay. The actual result will be a professional makeup application. Book a trial session to experience your chosen look in person.
          </div>
        </div>
      </div>
    </div>
  );
}
