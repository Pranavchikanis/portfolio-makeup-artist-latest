import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ txn?: string }> }) {
  const txn = (await searchParams).txn;
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card p-10 rounded-3xl border border-muted shadow-xl text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">Booking Confirmed!</h1>
        <p className="text-muted-foreground leading-relaxed">
          Your advance payment was successful and your date is officially locked in.
        </p>
        
        {txn && (
          <div className="bg-muted/50 p-4 rounded-xl text-sm font-mono text-muted-foreground break-all">
            Transaction ID: {txn}
          </div>
        )}
        
        <p className="text-sm text-foreground/80 my-8">
          You will receive a confirmation message on WhatsApp shortly to discuss details and inspiration.
        </p>
        
        <div className="pt-4 grid gap-4">
          <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
            <a href="https://wa.me/1234567890?text=Hi!%20I%20just%20completed%20my%20booking%20(Txn:%20" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
