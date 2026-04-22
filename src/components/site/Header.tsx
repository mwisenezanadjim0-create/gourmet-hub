import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
] as const;

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-script text-2xl text-terracotta">Olea</span>
          <span className="-mt-1 font-display text-xl tracking-[0.3em] text-foreground">&amp; EMBER</span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              activeProps={{ className: "text-terracotta" }}
              inactiveProps={{ className: "text-foreground/80 hover:text-terracotta" }}
              className="relative text-sm uppercase tracking-[0.22em] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="hidden rounded-full border border-terracotta px-5 py-2 text-xs uppercase tracking-[0.22em] text-terracotta transition-colors hover:bg-terracotta hover:text-primary-foreground sm:inline-block"
          >
            Order Now
          </Link>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-terracotta hover:text-terracotta"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
