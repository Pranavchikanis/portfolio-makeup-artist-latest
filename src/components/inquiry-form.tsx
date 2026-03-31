"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormData = {
  name: string;
  email?: string;
  phone: string;
  eventDate: string;
  service: string;
  location: string;
  budget: string;
};

export function InquiryForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // In strict PRD mode, we post to backend
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        console.error("Failed to submit lead");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-brand/10 p-8 rounded-2xl text-center border border-brand/20">
        <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">Request Received!</h3>
        <p className="text-muted-foreground">Thank you for your inquiry. I will check my availability for your date and get back to you via WhatsApp shortly to finalize your booking.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-2xl shadow-xl border border-muted w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif font-semibold mb-2">Check My Availability</h3>
        <p className="text-muted-foreground text-sm">Please fill out the form below and I will get back to you within 24 hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name *</label>
          <Input {...register("name", { required: true })} placeholder="e.g. Emma Watson" />
          {errors.name && <span className="text-xs text-red-500">Name is required</span>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number *</label>
          <Input {...register("phone", { required: true })} placeholder="+1 (555) 000-0000" />
          {errors.phone && <span className="text-xs text-red-500">Phone is required</span>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Event Date *</label>
          <Input type="date" {...register("eventDate", { required: true })} />
          {errors.eventDate && <span className="text-xs text-red-500">Date is required</span>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location / Venue</label>
          <Input {...register("location")} placeholder="e.g. The Plaza Hotel" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Service Required *</label>
          <select 
            {...register("service", { required: true })}
            className="flex h-11 w-full rounded-md border border-[var(--muted)] bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          >
            <option value="">Select a service...</option>
            <option value="Bridal Makeup">Signature Bridal Makeup</option>
            <option value="Party Glam">Party & Event Glam</option>
            <option value="Editorial">Editorial & Photoshoot</option>
          </select>
          {errors.service && <span className="text-xs text-red-500">Service selection is required</span>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estimated Budget</label>
          <Input {...register("budget")} placeholder="e.g. $500 - $1000" />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
