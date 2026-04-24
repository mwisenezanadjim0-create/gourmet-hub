import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks: { to: "/" | "/menu" | "/about"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
];

export function Header() {
  const { count } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1a0f0a]/70 backdrop-blur-3xl transition-colors duration-500">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-70 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-gold/50 hover:text-gold md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative h-4 w-5">
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="absolute left-0 top-0 h-0.5 w-full bg-current transition-transform"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="absolute left-0 top-1/2 -mt-px h-0.5 w-full bg-current"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform"
            />
          </div>
        </button>

        <Link to="/" className="group flex items-center gap-2 md:gap-3 leading-none">
          <div className="relative h-9 w-9 md:h-11 md:w-11 overflow-hidden rounded-full border border-gold/40 shadow-lg transition-transform group-hover:scale-105">
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
            <span className="font-script text-lg md:text-xl text-gold">Aslan Cafe</span>
            <span className="-mt-1 font-sans text-[8px] md:text-[9px] font-medium tracking-[0.4em] text-white/60 uppercase">
              Luxe &amp; Resto
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
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
            className="hidden sm:inline-block rounded-full border border-gold/40 bg-gold/5 px-4 py-2 md:px-6 md:py-2.5 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-gold transition-all hover:bg-gold hover:text-black"
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

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-60 flex flex-col md:hidden cursor-pointer"
          >
            {/* Dark Blur Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />
            
            <div className="relative flex h-full flex-col p-8 pt-24 text-center">
              {/* Centered Navigation Links */}
              <nav className="flex flex-1 flex-col items-center justify-center gap-14">
                {[
                  { to: "/", label: "Home" },
                  { to: "/menu", label: "Menu" },
                  { to: "/about", label: "Our Story" },
                  { to: "/about", label: "Contact" }
                ].map((link, i) => (
                  <motion.div
                    key={`${link.to}-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.to as any}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-6xl font-light tracking-tighter text-white/95 transition-all hover:text-gold active:scale-95 block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer info - Minimalist */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-auto border-t border-white/5 pt-12"
              >
                <Link
                  to="/menu"
                  onClick={() => setIsOpen(false)}
                  className="mx-auto flex max-w-xs items-center justify-center rounded-full bg-gold py-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black shadow-[0_20px_50px_rgba(212,175,55,0.2)] transition-all hover:bg-white hover:scale-105"
                >
                  Book a Table
                </Link>
                <div className="mt-12 opacity-20">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white">Kigali • Rwanda</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
