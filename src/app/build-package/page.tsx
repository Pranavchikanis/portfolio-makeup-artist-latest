import { PackageBuilder } from "@/components/package-builder";

export const metadata = {
  title: "Build Your Package | HappyFaces Makeup",
  description: "Customize your perfect makeup package with add-ons, travel fees, and dynamic pricing. Get an instant quote.",
};

export default function BuildPackagePage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">Build Your Package</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize your perfect makeup experience. Add services, calculate travel, and get an instant personalized quote with live dynamic pricing.
          </p>
        </div>
        <PackageBuilder />
      </div>
    </div>
  );
}
