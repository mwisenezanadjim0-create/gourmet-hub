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
    { src: interior, title: "Welcome to Aslan Cafe", subtitle: "Where luxury meets taste" },
    { src: heroDish, title: "Gourmet Flavors", subtitle: "Crafted with passion" },
    { src: table, title: "An Unforgettable Experience", subtitle: "Dining reimagined" },
  ];

  return (
    <SiteLayout>
      {/* Intro Slider */}
      <section className="relative w-full">
        <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 }), Fade()]}
        >
          <CarouselContent>
            {introSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative h-[60vh] min-h-100 w-full">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 p-6 text-center">
                  <span className="font-script text-4xl text-gold drop-shadow-md md:text-5xl">
                    {slide.subtitle}
                  </span>
                  <h1 className="mt-4 font-display text-5xl text-white drop-shadow-lg md:text-7xl">
                    {slide.title}
                  </h1>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-10 right-20 z-10 flex gap-4">
            <CarouselPrevious className="static h-12 w-12 border-white/20 bg-background/50 text-white backdrop-blur hover:bg-background hover:text-foreground" />
            <CarouselNext className="static h-12 w-12 border-white/20 bg-background/50 text-white backdrop-blur hover:bg-background hover:text-foreground" />
          </div>
        </Carousel>
      </section>

      <section className="reveal-on-scroll mx-auto max-w-4xl px-6 pb-10 pt-16 text-center">
        <span className="font-script text-3xl text-terracotta">a luxury restaurant</span>
        <h2 className="mt-2 font-display text-5xl md:text-6xl">Cooking slowly, on purpose.</h2>
        <p className="mx-auto mt-6 text-lg leading-relaxed text-muted-foreground">
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
