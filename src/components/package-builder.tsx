"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, MapPin } from "lucide-react";

type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type BasePackage = {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
};

const basePackages: BasePackage[] = [
  {
    id: "bridal-essential",
    name: "Bridal Essential",
    price: 500,
    features: ["Pre-wedding consultation", "Trial run included", "HD foundation & priming", "Lash application"],
    isPopular: true,
  },
  {
    id: "party-glam",
    name: "Party Glam",
    price: 150,
    features: ["Custom foundation matching", "Contour & highlight", "Eye styling", "Setting spray"],
  },
  {
    id: "editorial",
    name: "Editorial Look",
    price: 300,
    features: ["Creative direction", "Multiple looks", "On-set touch-ups", "Avant-garde options"],
  },
];

const addOns: AddOn[] = [
  { id: "airbrush", name: "Airbrush Upgrade", price: 80, description: "Flawless poreless finish" },
  { id: "hair", name: "Hair Styling", price: 120, description: "Blowout, waves or updo" },
  { id: "skincare", name: "Luxury Skin Prep", price: 60, description: "Sheet mask + serum treatment" },
  { id: "lashes", name: "Premium Lashes", price: 40, description: "Individual or strip sets" },
  { id: "bridesmaid", name: "Bridesmaid (per person)", price: 180, description: "Includes touch-up kit" },
];

// Dynamic pricing engine
function getDynamicMultiplier(date: Date | null): { multiplier: number; label: string } {
  if (!date) return { multiplier: 1, label: "" };
  const day = date.getDay();
  const month = date.getMonth();
  // Weekend surcharge
  if (day === 0 || day === 6) return { multiplier: 1.15, label: "Weekend (+15%)" };
  // High-season: Oct–Dec + May–Jul
  if ([4, 5, 6, 9, 10, 11].includes(month)) return { multiplier: 1.1, label: "Peak Season (+10%)" };
  return { multiplier: 1, label: "" };
}

export function PackageBuilder() {
  const [selectedBase, setSelectedBase] = useState<BasePackage>(basePackages[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [travelKm, setTravelKm] = useState(0);
  const [eventDate, setEventDate] = useState<Date | null>(null);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const pricing = useMemo(() => {
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find(a => a.id === id);
      return sum + (addon?.price ?? 0);
    }, 0);
    const travelFee = travelKm > 20 ? (travelKm - 20) * 1.5 : 0;
    const subtotal = selectedBase.price + addOnTotal + travelFee;
    const { multiplier, label } = getDynamicMultiplier(eventDate);
    const total = Math.round(subtotal * multiplier);
    const advance = Math.round(total * 0.2); // 20% advance
    return { addOnTotal, travelFee, subtotal, multiplier, surchargeLabel: label, total, advance };
  }, [selectedBase, selectedAddOns, travelKm, eventDate]);

  const bookingLink = `/book?service=${selectedBase.id}&addons=${selectedAddOns.join(",")}&total=${pricing.total}`;

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Base Package Selector */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-4">1. Choose Your Base Package</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {basePackages.map(pkg => (
              <button
                key={pkg.id}
                onClick={() => setSelectedBase(pkg)}
                className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                  selectedBase.id === pkg.id
                    ? "border-brand bg-brand/5 shadow-lg"
                    : "border-muted bg-card hover:border-brand/40"
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-3 text-xs bg-brand text-brand-foreground px-2 py-0.5 rounded-full font-bold">
                    Popular
                  </span>
                )}
                <p className="font-semibold text-foreground">{pkg.name}</p>
                <p className="text-2xl font-light mt-1 text-brand">${pkg.price}</p>
                <ul className="mt-3 space-y-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                      <Check className="w-3 h-3 text-brand" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* Add-Ons */}
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-4">2. Customize with Add-Ons</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {addOns.map(addon => {
              const isSelected = selectedAddOns.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected ? "border-brand bg-brand/5" : "border-muted bg-card hover:border-brand/40"
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">{addon.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{addon.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <span className="text-sm font-semibold text-brand">+${addon.price}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "bg-brand border-brand" : "border-muted"
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Travel Calculator */}
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-4">3. Travel Distance</h3>
          <div className="p-5 bg-card rounded-2xl border border-muted">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium">Distance from studio: <strong>{travelKm} km</strong></span>
              {travelKm > 20 && (
                <span className="text-xs text-brand ml-auto">+${pricing.travelFee.toFixed(0)} travel fee</span>
              )}
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={travelKm}
              onChange={e => setTravelKm(Number(e.target.value))}
              className="w-full accent-[var(--brand)]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0 km (Free)</span>
              <span>20 km (Free)</span>
              <span>100 km</span>
            </div>
            {travelKm <= 20 && <p className="text-xs text-green-600 mt-2 font-medium">✓ Free travel within 20 km</p>}
          </div>
        </div>

        {/* Event Date for Dynamic Pricing */}
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-4">4. Event Date <span className="text-base font-normal text-muted-foreground">(affects pricing)</span></h3>
          <div className="p-5 bg-card rounded-2xl border border-muted">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={e => setEventDate(e.target.value ? new Date(e.target.value) : null)}
              className="w-full px-4 py-3 rounded-lg border border-muted bg-background focus:ring-2 focus:ring-brand outline-none transition-all"
            />
            {pricing.surchargeLabel && (
              <p className="text-xs text-amber-600 font-medium mt-2">⚡ {pricing.surchargeLabel} applies to your selected date</p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Price Summary */}
      <div className="lg:col-span-1">
        <div className="bg-card p-6 rounded-3xl border border-muted shadow-lg sticky top-24 space-y-4">
          <h3 className="font-serif text-xl font-semibold">Your Package</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{selectedBase.name}</span>
              <span>${selectedBase.price}</span>
            </div>
            {selectedAddOns.map(id => {
              const addon = addOns.find(a => a.id === id)!;
              return (
                <div key={id} className="flex justify-between text-muted-foreground">
                  <span>+ {addon.name}</span>
                  <span>+${addon.price}</span>
                </div>
              );
            })}
            {pricing.travelFee > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Travel fee</span>
                <span>+${pricing.travelFee.toFixed(0)}</span>
              </div>
            )}
            {pricing.surchargeLabel && (
              <div className="flex justify-between text-amber-600">
                <span>{pricing.surchargeLabel}</span>
                <span>+${(pricing.total - pricing.subtotal).toFixed(0)}</span>
              </div>
            )}
          </div>

          <div className="border-t border-muted pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${pricing.total}</span>
            </div>
            <div className="flex justify-between text-sm text-brand mt-1">
              <span>Today's Advance (20%)</span>
              <span>${pricing.advance}</span>
            </div>
          </div>

          <Button
            asChild
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90 h-12 text-base mt-2"
          >
            <a href={bookingLink}>Proceed to Book →</a>
          </Button>
          <p className="text-xs text-center text-muted-foreground">No hidden fees. Easy cancellation within 48 hrs.</p>
        </div>
      </div>
    </div>
  );
}
