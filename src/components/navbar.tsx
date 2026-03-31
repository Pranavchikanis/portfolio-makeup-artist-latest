"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/build-package", label: "Package Builder" },
  { href: "/ar-try-on", label: "AR Try-On ✨" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-wide font-bold text-foreground">
            Happy<span className="text-brand">Faces</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book">
              <Button className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-md">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground hover:text-brand transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-muted px-6 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-foreground hover:text-brand font-medium py-2 border-b border-muted/50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setMobileOpen(false)}>
            <Button className="w-full bg-brand text-brand-foreground hover:bg-brand/90 mt-2">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
