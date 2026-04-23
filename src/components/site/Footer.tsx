import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[color-mix(in_oklab,var(--olive)_18%,var(--background))]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="mb-4">
            <span className="block font-script text-3xl text-terracotta">Aslan Cafe</span>
            <span className="block font-display text-2xl tracking-[0.3em]">LUXE &amp; RESTO</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Exquisite flavors, premium dining, and a touch of luxury in every dish.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/80 transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground/80 transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Visit</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <span>142 Cedar Lane<br />Brooklyn, NY 11211</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <span>Tue–Sun · 5pm – 11pm<br />Closed Mondays</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <a href="tel:+17185550142" className="hover:text-terracotta">(718) 555-0142</a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              <a href="mailto:hello@aslancafeluxe.com" className="hover:text-terracotta">hello@aslancafeluxe.com</a>
            </li>
            <li className="text-muted-foreground">
              Owner & Chef<br />
              <span className="text-foreground">Mira Kavalis</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-terracotta">Menu</Link></li>
            <li><Link to="/about" className="hover:text-terracotta">Our Story</Link></li>
            <li><Link to="/cart" className="hover:text-terracotta">Order Online</Link></li>
            <li><Link to="/staff/login" className="hover:text-terracotta">Staff Login</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aslan Cafe Luxe &amp; Resto · Crafted with passion & luxury
      </div>
    </footer>
  );
}
