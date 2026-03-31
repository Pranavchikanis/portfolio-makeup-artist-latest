import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Star, Users, Camera } from "lucide-react";

const credentials = [
  { icon: Award, label: "Certified", value: "Pro MUA – CIDESCO International" },
  { icon: Star, label: "Years Experience", value: "12+ Years in Industry" },
  { icon: Users, label: "Happy Clients", value: "500+ Brides Served" },
  { icon: Camera, label: "Featured In", value: "Vogue India, Femina" },
];

const collaborations = [
  "Vogue India", "Femina", "Lakme", "Charlotte Tilbury", "NARS Cosmetics", "MAC Cosmetics"
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand mb-3 block">About the Artist</span>
              <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-tight">
                The Vision Behind
                <br />
                <span className="text-brand">HappyFaces</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm <strong>Nisha Kapoor</strong>, a CIDESCO-certified makeup artist with over 12 years of professional experience. My work has graced bridal suites, editorial spreads, and film sets across India and beyond.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My philosophy is simple: makeup should enhance your natural beauty, not mask it. Every face tells a story, and I'm here to help it shine. I specialize in HD-ready, long-lasting makeup that photographs beautifully and lasts through every emotion of your special day.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
                <Link href="/book">Book a Consultation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/portfolio">View My Work</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/artist_portrait.png"
                alt="Nisha Kapoor - Makeup Artist"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand text-brand-foreground px-6 py-4 rounded-2xl shadow-xl">
              <p className="font-serif text-3xl font-bold">12+</p>
              <p className="text-xs font-medium uppercase tracking-wider">Years of Artistry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-card border-y border-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center p-6 rounded-2xl bg-background border border-muted shadow-sm">
                <Icon className="w-8 h-8 text-brand mx-auto mb-3" />
                <p className="font-semibold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations / Featured In */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-semibold mb-3">Featured In & Collaborated With</h2>
          <p className="text-muted-foreground">Work that has been recognized and featured across leading beauty platforms.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {collaborations.map(brand => (
            <div key={brand} className="px-6 py-3 bg-card border border-muted rounded-full text-sm font-medium text-muted-foreground hover:border-brand hover:text-brand transition-colors">
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-foreground text-background text-center">
        <h2 className="font-serif text-4xl font-bold mb-4">Ready to Create Your Look?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join 500+ happy clients who trust HappyFaces for their most important moments.</p>
        <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 h-14 px-12 text-lg">
          <Link href="/book">Book Your Session</Link>
        </Button>
      </section>
    </div>
  );
}
