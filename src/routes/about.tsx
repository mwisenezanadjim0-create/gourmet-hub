import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import interior from "@/assets/about-interior.jpg";
import chef from "@/assets/about-chef.jpg";
import kitchen from "@/assets/about-kitchen.jpg";
import olivegrove from "@/assets/about-olivegrove.jpg";
import table from "@/assets/about-table.jpg";
import market from "@/assets/about-market.jpg";
import heroDish from "@/assets/hero-dish.jpg";
import aslanImage1 from "@/assets/aslanImage1.png";
import aslanImage2 from "@/assets/aslanImage2.png";
import aslanImage3 from "@/assets/aslanImage3.png";
import { useEffect } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Aslan Cafe Luxe & Resto" },
      {
        name: "description",
        content:
          "The story behind Aslan Cafe Luxe & Resto: passion for gourmet flavors, luxury dining, and the finest ingredients in Kigali.",
      },
      { property: "og:title", content: "Our Story — Aslan Cafe Luxe & Resto" },
      {
        property: "og:description",
        content: "Gourmet dining, luxury atmosphere, and a passion for excellence in Kigali.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const gallery = [
    { src: interior, alt: "Warm candlelit dining room" },
    { src: chef, alt: "Chef kneading sourdough" },
    { src: kitchen, alt: "Wood-fired oven burning" },
    { src: olivegrove, alt: "Olive grove at golden hour" },
    { src: table, alt: "Intimate candlelit table setting" },
    { src: market, alt: "Baskets of fresh produce at market" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const introSlides = [
    { src: aslanImage1, title: "Welcome to Aslan Cafe", subtitle: "Where luxury meets taste" },
    { src: aslanImage2, title: "Gourmet Flavors", subtitle: "Crafted with passion" },
    { src: aslanImage3, title: "An Unforgettable Experience", subtitle: "Dining reimagined" },
  ];

  return (
    <SiteLayout>
      {/* Intro Slider */}
      <section className="relative w-full">
        <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 9000 }), Fade()]}
        >
          <style>
            {`
              [data-embla-slide] {
                transition: opacity 3000ms ease-in-out !important;
              }
            `}
          </style>
          <div className="relative">
            <CarouselContent>
              {introSlides.map((slide, index) => (
                <CarouselItem key={index} className="group relative h-[85vh] min-h-120 w-full overflow-hidden">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className={`absolute inset-0 h-full w-full object-cover brightness-[0.85] animate-montage ${
                      index === 2 ? "object-bottom" : "object-center"
                    }`}
                  />
                  <div className="relative z-20 flex h-full flex-col items-center justify-center p-6 text-center">
                    <div className="max-w-4xl">
                      <span className="font-script text-4xl md:text-6xl text-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-4 duration-1500">
                        {slide.subtitle}
                      </span>
                      <h1 className="mt-6 font-display text-5xl md:text-8xl text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-bottom-8 duration-1500 delay-300">
                        {slide.title}
                      </h1>
                      <div className="mx-auto mt-10 h-px w-32 bg-linear-to-r from-transparent via-gold to-transparent opacity-60" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Persistent Cinematic Filter Overlay — stays during transitions */}
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
              {/* Glass Base */}
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
              
              {/* Color Tint Glass */}
              <div className="absolute inset-0 bg-linear-to-tr from-terracotta/30 via-transparent to-gold/20 mix-blend-overlay opacity-60" />
              
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.75)_100%)] opacity-70" />
              
              {/* Film Grain / Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light" 
                   style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")` }} />
            </div>
          </div>

          <div className="absolute bottom-10 right-20 z-30 flex gap-4">
            <CarouselPrevious className="static h-12 w-12 border-white/20 bg-background/50 text-white backdrop-blur hover:bg-background hover:text-foreground" />
            <CarouselNext className="static h-12 w-12 border-white/20 bg-background/50 text-white backdrop-blur hover:bg-background hover:text-foreground" />
          </div>
        </Carousel>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-4xl px-6 pb-10 pt-16 text-center">
        <span className="font-script text-2xl md:text-3xl text-terracotta">a luxury restaurant</span>
        <h2 className="mt-2 font-display text-4xl md:text-6xl">Cooking slowly, on purpose.</h2>
        <p className="mx-auto mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
          Aslan Cafe Luxe &amp; Resto began as a vision for premium dining in the heart of Kigali.
          Our mission is to bring together the finest local ingredients with international gourmet
          techniques, creating an atmosphere where luxury meets the plate.
        </p>
        <div className="divider-organic mx-auto mt-10" />
      </section>

      {/* Gallery — asymmetric grid */}
      <section className="reveal-on-scroll mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          <div className="reveal-on-scroll col-span-2 aspect-4/3 overflow-hidden rounded-[2rem] md:col-span-7 md:row-span-2 md:aspect-auto">
            <img
              src={gallery[0].src}
              alt={gallery[0].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1200}
              height={900}
            />
          </div>
          <div className="reveal-on-scroll reveal-delay-100 col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-5 md:aspect-5/4">
            <img
              src={gallery[1].src}
              alt={gallery[1].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1200}
              height={900}
            />
          </div>
          <div className="reveal-on-scroll reveal-delay-200 col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-5 md:aspect-5/4">
            <img
              src={gallery[2].src}
              alt={gallery[2].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1200}
              height={900}
            />
          </div>
          <div className="reveal-on-scroll reveal-delay-300 col-span-2 aspect-video overflow-hidden rounded-[2rem] md:col-span-4 md:aspect-4/3">
            <img
              src={gallery[3].src}
              alt={gallery[3].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1200}
              height={900}
            />
          </div>
          <div className="reveal-on-scroll reveal-delay-400 col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-4 md:aspect-4/3">
            <img
              src={gallery[4].src}
              alt={gallery[4].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1200}
              height={900}
            />
          </div>
          <div className="reveal-on-scroll reveal-delay-500 col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-4 md:aspect-4/3">
            <img
              src={gallery[5].src}
              alt={gallery[5].alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              width={1200}
              height={900}
            />
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll mx-auto grid max-w-5xl gap-14 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Three stubborn ideas</h2>
          <ul className="mt-6 space-y-5 text-muted-foreground">
            <li className="reveal-on-scroll reveal-delay-100">
              <span className="font-display text-lg text-foreground">Exquisite Flavors.</span>
              <br />
              We blend tradition with luxury, ensuring every bite is a masterpiece.
            </li>
            <li className="reveal-on-scroll reveal-delay-200">
              <span className="font-display text-lg text-foreground">Premium Ingredients.</span>
              <br />
              We source the rarest and finest ingredients from around the world and our local lands.
            </li>
            <li className="reveal-on-scroll reveal-delay-300">
              <span className="font-display text-lg text-foreground">Unmatched Atmosphere.</span>
              <br />
              Dining is an experience. We provide a space where luxury and comfort coexist.
            </li>
          </ul>
        </div>

        <div className="reveal-on-scroll reveal-delay-400 rounded-[2.5rem] border border-border/60 bg-card/70 p-8 backdrop-blur">
          <p className="font-script text-3xl text-terracotta">— Aslan Team</p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Founders & Culinary Team
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            "Our goal is to create a sanctuary of taste. At Aslan Cafe Luxe &amp; Resto, we believe
            that dining is an art form, and every guest deserves a performance of flavors and
            elegance that stays with them long after the meal."
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
