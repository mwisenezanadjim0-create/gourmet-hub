import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const navLinks: { to: "/" | "/menu" | "/about"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
];

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3 leading-none">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold shadow-lg transition-transform group-hover:scale-110">
            <img
              src="/aslanlogo.png"
              alt="Aslan Cafe Logo"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-script text-2xl text-gold">Aslan Cafe</span>
            <span className="-mt-1 font-sans text-[10px] font-medium tracking-[0.45em] text-foreground/60 uppercase">
              Luxe &amp; Resto
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              activeProps={{ className: "text-gold" }}
              inactiveProps={{ className: "text-foreground/80 hover:text-gold" }}
              className="relative text-sm uppercase tracking-[0.22em] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="hidden rounded-full border border-gold px-5 py-2 text-xs uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground sm:inline-block"
          >
            Order Now
          </Link>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
