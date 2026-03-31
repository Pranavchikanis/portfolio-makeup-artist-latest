import { BookingForm } from "@/components/booking-form";

export default async function BookPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const service = (await searchParams).service;
  
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">Secure Your Date</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Select your package, choose a date, and lock it in with a risk-free advance demo payment.</p>
        </div>
        <BookingForm initialService={service} />
      </div>
    </div>
  );
}
