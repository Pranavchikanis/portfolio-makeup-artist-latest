import { PortfolioGrid } from "@/components/portfolio-grid";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">Portfolio Showcase</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore recent looks and find inspiration for your own makeup styling. Click "Get This Look" to book the exact same aesthetic.</p>
        </div>
        <PortfolioGrid />
      </div>
    </div>
  );
}
