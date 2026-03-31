"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const content = {
  en: {
    tag: "Luxury Makeup Artistry",
    title: "Enhance Your Natural Beauty",
    desc: "Specializing in high-end bridal, event, and editorial makeup. Look and feel your absolute best on your special day with long-lasting, HD-ready transformations.",
    cta1: "Check Availability",
    cta2: "View Portfolio"
  },
  es: {
    tag: "Maquillaje de Lujo",
    title: "Realza Tu Belleza Natural",
    desc: "Especialista en maquillaje de alta gama para novias, eventos y editorial. Luzca y siéntase de lo mejor en su día especial con transformaciones duraderas y listas para HD.",
    cta1: "Consultar Disponibilidad",
    cta2: "Ver Portafolio"
  }
};

export function HeroSection() {
  const [lang, setLang] = useState<"en" | "es">("en");
  
  const text = content[lang];

  return (
    <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button 
          onClick={() => setLang("en")} 
          className={`text-xs font-bold px-2 py-1 rounded border ${lang === "en" ? "bg-brand text-brand-foreground border-brand" : "text-muted-foreground border-muted"}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLang("es")} 
          className={`text-xs font-bold px-2 py-1 rounded border ${lang === "es" ? "bg-brand text-brand-foreground border-brand" : "text-muted-foreground border-muted"}`}
        >
          ES
        </button>
      </div>
      
      <div className="flex-1 space-y-8 z-10 w-full mt-8 md:mt-0">
        <div className="space-y-4">
          <span className="text-brand font-medium tracking-wider text-sm uppercase transition-all">{text.tag}</span>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-tight text-foreground transition-all">
            {text.title}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed transition-all">
          {text.desc}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full">
          <Button asChild size="lg" className="w-full sm:w-auto text-base bg-brand hover:bg-brand/90 text-brand-foreground shadow-md transition-all"><a href="/book">{text.cta1}</a></Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base transition-all"><a href="/portfolio">{text.cta2}</a></Button>
        </div>
      </div>
      
      <div className="flex-1 relative w-full h-[500px] md:h-[600px] max-w-md md:max-w-lg rounded-[150px] overflow-hidden shadow-2xl border-4 border-background bg-muted mx-auto">
        <Image 
          src="/images/hero_bridal_makeup.png" 
          alt="Beautiful bride with flawless makeup" 
          fill 
          className="object-cover" 
          priority
        />
      </div>
      
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl -z-10 mix-blend-multiply" />
    </section>
  );
}
