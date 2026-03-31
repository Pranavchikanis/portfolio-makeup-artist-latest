import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 border-t border-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-wide font-bold">
              Happy<span className="text-brand">Faces</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-400 max-w-sm">
              Premium bridal, editorial, and event makeup artist. Transforming you into your most beautiful, confident self.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Services & Pricing</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book Now</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand-foreground">Connect</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} Happy Faces Makeup. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
