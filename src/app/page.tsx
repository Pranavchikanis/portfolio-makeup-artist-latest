import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { HeroSection } from "@/components/hero-section";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* BEFORE / AFTER HIGHLIGHT */}
      <section className="py-24 bg-background border-t border-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">The Transformation Experience</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every client has unique features. The goal is never to mask them, but to elevate and highlight your natural face. Slide to see a real, unfiltered transformation.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" variant="outline"><a href="/portfolio">View Full Gallery</a></Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl h-[500px]">
            <BeforeAfterSlider beforeImage="/images/makeup_before.png" afterImage="/images/makeup_after.png" />
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="services" className="py-24 bg-card text-card-foreground">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">Signature Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tailored makeup experiences ensuring you look picture-perfect for any occasion.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative p-8 rounded-2xl border border-muted bg-background hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {service.isPopular && (
                  <span className="absolute -top-3 left-8 bg-brand text-brand-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-serif font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">{service.description}</p>
                
                <div className="mb-8">
                  <span className="text-3xl font-bold">From ${service.startingPrice}</span>
                </div>
                
                <ul className="space-y-3 mb-8 text-sm">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full mt-auto" variant={service.isPopular ? "default" : "outline"}>
                  <a href={`/book?service=${service.id}`}>Inquire Now</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">Portfolio Showcase</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore recent looks and find inspiration for your own makeup styling.</p>
          </div>
          <PortfolioGrid />
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Follow on Instagram</a></Button>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-24 bg-card border-t border-muted overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4 relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-card-foreground">Words from Clients</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Trusted by hundreds of brides and models for their most important moments.</p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-background border-t border-muted">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to know about booking, dates, and travel fees.</p>
          </div>
          <FAQSection />
        </div>
      </section>
    </main>
  );
}
