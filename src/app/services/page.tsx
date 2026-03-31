import { services } from "@/data/services";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">Services & Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our signature makeup experiences. Book your session today and secure your spot.</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="relative p-8 rounded-3xl border border-muted bg-card shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
              {service.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-brand-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-serif font-semibold text-card-foreground mb-4 text-center">{service.title}</h2>
              <div className="text-center mb-8">
                <p className="text-4xl font-light text-foreground">${service.startingPrice}</p>
                <p className="text-sm text-muted-foreground mt-1">Starting price</p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow text-center">{service.description}</p>
              
              <ul className="space-y-4 mb-10 text-sm text-card-foreground">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 justify-center">
                    <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild size="lg" className="w-full mt-auto" variant={service.isPopular ? "default" : "outline"}>
                <a href={`/book?service=${service.id}`}>Book This Package</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
