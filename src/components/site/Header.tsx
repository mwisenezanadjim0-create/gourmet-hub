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
    <header className="fixed inset-x-0 top-6 z-50 px-6 pointer-events-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[30px] border border-white/10 bg-[#1a0f0a]/60 px-8 backdrop-blur-3xl shadow-2xl pointer-events-auto transition-all duration-500 hover:border-white/20">
        <Link to="/" className="group flex items-center gap-3 leading-none">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gold/40 shadow-lg transition-transform group-hover:scale-105">
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
            <span className="font-script text-lg text-gold">Aslan Cafe</span>
            <span className="-mt-0.5 font-sans text-[8px] font-medium tracking-[0.4em] text-white/60 uppercase">
              Luxe &amp; Resto
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.exact }}
              activeProps={{ className: "text-gold" }}
              inactiveProps={{ className: "text-white/95 hover:text-gold" }}
              className="relative text-[10px] font-bold uppercase tracking-[0.25em] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="hidden rounded-full border border-gold/30 bg-gold/5 px-5 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-gold transition-all hover:bg-gold hover:text-black sm:inline-block"
          >
            Order Now
          </Link>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/50 hover:text-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[8px] font-bold text-black">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
