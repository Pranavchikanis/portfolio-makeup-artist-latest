import { ARTryOn } from "@/components/ar-try-on";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "AR Virtual Try-On | HappyFaces Makeup",
  description: "Try different makeup looks virtually before booking your session. Explore bridal, smoky, editorial, and natural looks.",
};

export default function ARTryOnPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Preview Technology
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">
            Virtual Makeup Try-On
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different makeup aesthetics before committing. Click a look on the right to see a simulated preview, then book the one that resonates with you.
          </p>
        </div>
        <ARTryOn />
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Found your perfect look?</p>
          <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
            <Link href="/book">Book Your Session Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
