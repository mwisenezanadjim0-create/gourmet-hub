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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1a0f0a]/70 backdrop-blur-3xl transition-colors duration-500">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3 leading-none">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-gold/40 shadow-lg transition-transform group-hover:scale-105">
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
            <span className="font-script text-xl text-gold">Aslan Cafe</span>
            <span className="-mt-1 font-sans text-[9px] font-medium tracking-[0.4em] text-white/60 uppercase">
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
              inactiveProps={{ className: "text-white hover:text-gold" }}
              className="relative text-[11px] font-bold uppercase tracking-[0.25em] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/menu"
            className="hidden rounded-full border border-gold/40 bg-gold/5 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold transition-all hover:bg-gold hover:text-black sm:inline-block"
          >
            Order Now
          </Link>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/50 hover:text-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-black">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
