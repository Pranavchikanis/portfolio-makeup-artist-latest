"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { createBooking } from "@/app/actions";
import "react-day-picker/dist/style.css";

function SubmitButton({ amount }: { amount: number }) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className="w-full h-14 text-lg mt-8 bg-brand hover:bg-brand/90 text-brand-foreground transition-all flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Processing Payment...
        </>
      ) : (
        `Pay $${amount} Advance & Book`
      )}
    </Button>
  );
}

export function BookingForm({ initialService }: { initialService?: string }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<string>(initialService || services[0].id);
  const [errorObj, setErrorObj] = useState<string | null>(null);

  const selectedServiceDetails = services.find(s => s.id === selectedService);
  const advanceAmount = 50; // Flat $50 booking fee
  
  async function onSubmit(formData: FormData) {
    if (!selectedDate) {
      setErrorObj("Please select a date.");
      return;
    }
    
    formData.append("date", selectedDate.toISOString());
    formData.append("service", selectedServiceDetails?.title || "");
    
    setErrorObj(null);
    const result = await createBooking(formData);
    
    if (result?.error) {
      setErrorObj(result.error);
    }
  }

  return (
    <form action={onSubmit} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
      {/* LEFT COLUMN: Form & Date */}
      <div className="space-y-8 bg-card p-8 rounded-3xl border border-muted shadow-sm">
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-6">Client Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-muted bg-background focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">WhatsApp Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-muted bg-background focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium mb-2">Select Service</label>
              <select 
                id="service" 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-muted bg-background focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all appearance-none"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.title} (from ${s.startingPrice})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-muted overflow-hidden">
          <h2 className="text-2xl font-serif font-semibold mb-6">Select Date</h2>
          <div className="flex justify-center bg-background rounded-xl p-4 border border-muted">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={[{ before: new Date() }]}
              className="rdp-custom"
              styles={{
                day: { margin: "0.2em", width: "40px", height: "40px" },
                caption: { color: "var(--brand)" }
              }}
              modifiersClassNames={{
                selected: "bg-brand text-brand-foreground font-bold hover:bg-brand hover:text-white"
              }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Summary & Payment */}
      <div className="space-y-8">
        <div className="bg-card p-8 rounded-3xl border border-muted shadow-sm sticky top-24">
          <h2 className="text-2xl font-serif font-semibold mb-6">Booking Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-muted">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium text-right">{selectedServiceDetails?.title}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-muted">
              <span className="text-muted-foreground">Event Date</span>
              <span className="font-medium">{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-muted">
              <span className="text-muted-foreground">Est. Total</span>
              <span className="font-medium">${selectedServiceDetails?.startingPrice}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-semibold pt-4">
              <span>Advance Required</span>
              <span className="text-brand">${advanceAmount}</span>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-xl text-sm text-muted-foreground mb-6">
            <p><strong>Demo Payment System:</strong> Clicking the button below will simulate a $50 transaction to lock in your date.</p>
          </div>

          {errorObj && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-200">
              {errorObj}
            </div>
          )}

          <SubmitButton amount={advanceAmount} />
        </div>
      </div>
    </form>
  );
}
