import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { imageForSlug } from "@/lib/menu-images";
import { useCart, formatPrice } from "@/lib/cart";
import aboutInterior from "@/assets/about-interior.jpg";
import { toast } from "sonner";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aslan Cafe Luxe & Resto — Luxury Dining in Kigali" },
      {
        name: "description",
        content:
          "Experience gourmet flavors and luxury dining at Aslan Cafe Luxe & Resto. Premium dining in the heart of Kigali.",
      },
      { property: "og:title", content: "Aslan Cafe Luxe & Resto — Luxury Dining in Kigali" },
      {
        property: "og:description",
        content: "Experience gourmet flavors and luxury dining at Aslan Cafe Luxe & Resto.",
      },
    ],
  }),
  component: HomePage,
});

const heroSlides = [
  {
    src: img1,
    alt: "Premium coffee and pastry experience",
    title: {
      main: "Elevating the",
      accent: "essence",
      script: "luxury coffee.",
    },
    description:
      "An exclusive sanctuary in Kigali. We craft with precision, source the rarest beans, and serve with uncompromising elegance.",
    caption: "The pinnacle of Kigali's coffee culture",
    label: "Luxury Travel Guide",
  },
  {
    src: img2,
    alt: "Gourmet dining atmosphere",
    title: {
      main: "A sanctuary of",
      accent: "taste",
      script: "fine dining.",
    },
    description:
      "Experience culinary excellence where every dish tells a story of passion, precision, and locally sourced perfection.",
    caption: "A sanctuary of taste & refinement",
    label: "Fine Dining Weekly",
  },
  {
    src: img3,
    alt: "Artisan culinary craftsmanship",
    title: {
      main: "Crafting every",
      accent: "detail",
      script: "of culinary art.",
    },
    description:
      "Our chefs blend traditional techniques with modern innovation to create an unforgettable performance of flavors.",
    caption: "Where every detail is a masterpiece",
    label: "Gourmet International",
  },
  {
    src: img4,
    alt: "Luxurious café ambiance",
    title: {
      main: "Moments of",
      accent: "pure",
      script: "absolute luxury.",
    },
    description:
      "Escape to a world of refined comfort and exquisite taste, right in the heart of Kigali's vibrant culture.",
    caption: "Luxury redefined, one cup at a time",
    label: "Prestige Magazine",
  },
  {
    src: img5,
    alt: "Exquisite flavors and presentation",
    title: {
      main: "The art of",
      accent: "premium",
      script: "gourmet dining.",
    },
    description:
      "Discover a sanctuary where luxury meets the plate, and every meal is a celebration of the finest ingredients.",
    caption: "An experience beyond the ordinary",
    label: "Culinary Arts Review",
  },
];

function HomePage() {
  const { add } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [cardVisible, setCardVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCardVisible(false);
    setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      setDirection(1);
      // Wait a tiny bit for the slide change to register before showing the card again
      setTimeout(() => setCardVisible(true), 50);
    }, 600); // Increased delay for smoother transition
  }, []);

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

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(nextSlide, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide, isPaused]);

  const prevSlide = () => {
    setCardVisible(false);
    setTimeout(() => {
      setDirection(-1);
      setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setTimeout(() => setCardVisible(true), 50);
    }, 600);
  };

  const goToSlide = (index: number) => {
    if (index === activeSlide) return;
    setCardVisible(false);
    setTimeout(() => {
      setDirection(index > activeSlide ? 1 : -1);
      setActiveSlide(index);
      setCardVisible(true);
    }, 400);
  };

  const { data: featured } = useQuery({
    queryKey: ["menu-featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true)
        .order("sort_order")
        .limit(8);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <SiteLayout>
      {/* HERO */}
      <section
        className="relative flex min-h-screen items-center overflow-hidden bg-[#f4ece4]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ─── Dynamic Dark Blurred Background (Synced with Slider) ─── */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 h-full w-full transition-all duration-1500 ease-in-out ${
                activeSlide === i ? "opacity-60 z-10 scale-100" : "opacity-0 z-0 scale-110"
              }`}
            >
              <img
                src={slide.src}
                alt=""
                className="h-full w-full object-cover blur-2xl brightness-75 contrast-125"
                loading="lazy"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-linear-to-b from-[#1a0f0a]/40 via-[#1a0f0a]/20 to-[#1a0f0a]/60" />
        </div>

        {/* ─── Main content grid ─── */}
        <div className="relative z-10 mx-auto flex w-full max-w-400 flex-col gap-10 px-0 pb-24 pt-24 md:grid md:grid-cols-[0.6fr_1.4fr] md:gap-16 md:px-12">
          {/* Text content */}
          <div className="relative z-30 mx-6 flex flex-col justify-center rounded-[2.5rem] border border-white/10 bg-[#1a0f0a]/40 p-8 shadow-2xl backdrop-blur-xl md:mx-0 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
            <span className="mb-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.4em] text-gold/80 md:text-sm md:text-gold">
              <span className="h-px w-8 bg-gold/40 md:w-10 md:bg-gold/60" /> Kigali · est. 2024
            </span>
            <div className="overflow-hidden">
              <h1
                className={`font-display text-3xl leading-[1.1] text-white transition-all duration-800 ease-out md:text-6xl md:leading-[1.05] ${
                  cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7.5"
                }`}
              >
                {heroSlides[activeSlide].title.main}{" "}
                <span className="font-script text-5xl text-gold md:text-7xl">
                  {heroSlides[activeSlide].title.accent}
                </span>
                <br />
                <span className="font-script text-4xl text-gold md:text-6xl">
                  {heroSlides[activeSlide].title.script}
                </span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <p
                className={`mt-6 max-w-md text-sm font-medium leading-relaxed tracking-wide text-white/90 transition-all delay-150 duration-800 ease-out md:mt-8 md:text-xl md:text-white/80 ${
                  cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.75"
                }`}
              >
                {heroSlides[activeSlide].description}
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-full bg-[#1a0f0a] px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white shadow-xl transition-all hover:bg-black md:bg-terracotta md:text-xs md:tracking-[0.22em] md:text-primary-foreground md:hover:bg-ember"
              >
                Order Online
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-colors hover:bg-white/10 md:border-foreground/30 md:bg-transparent md:text-xs md:tracking-[0.22em] md:text-foreground md:hover:border-terracotta md:hover:text-terracotta"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* ─── Desktop: image column (restored slider) ─── */}
          <div className="relative hidden md:block">
            {/* Glow orbs */}
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
            <div className="absolute -bottom-10 left-8 h-64 w-64 rounded-full bg-terracotta/25 blur-3xl" />

            {/* Image slideshow */}
            <div className="relative aspect-3/2 overflow-hidden rounded-[2.5rem] border border-border/40 bg-muted shadow-2xl shadow-foreground/5">
              {heroSlides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 h-full w-full transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    activeSlide === i
                      ? "opacity-100 z-20 scale-100 pointer-events-auto"
                      : "opacity-0 z-10 scale-110 pointer-events-none"
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    width={1600}
                    height={1600}
                    loading="eager"
                    fetchPriority="high"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                </div>
              ))}

              {/* Navigation arrows (desktop) */}
              <div className="absolute inset-x-4 top-1/2 z-30 flex -translate-y-1/2 justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="group pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white/70 backdrop-blur-sm transition-all hover:border-gold hover:bg-black/30 hover:text-gold"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="group pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white/70 backdrop-blur-sm transition-all hover:border-gold hover:bg-black/30 hover:text-gold"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Progress dots (desktop) */}
              <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="group relative h-2 p-1 focus:outline-none"
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === activeSlide ? "w-10 bg-gold" : "w-2 bg-white/40"
                      }`}
                    />
                    <div className="absolute -inset-1 rounded-full opacity-0 group-hover:bg-white/10 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-sliding floating glass card */}
            <Link
              to="/menu"
              className={`absolute -left-12 bottom-20 z-40 block overflow-hidden rounded-3xl border border-white/10 bg-[#1a0f0a]/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-3xl transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] min-w-[320px] hover:scale-105 hover:border-gold/30 hover:bg-[#1a0f0a]/80 ${
                cardVisible
                  ? "-rotate-3 translate-y-0 scale-100 opacity-100"
                  : "rotate-0 translate-y-7.5 scale-90 opacity-0"
              }`}
            >
              <div className="px-7 py-5">
                <div className="overflow-hidden">
                  <p
                    className={`font-script text-xl text-gold leading-tight transition-all duration-500 ${
                      cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.75"
                    }`}
                  >
                    &ldquo;{heroSlides[activeSlide].caption}&rdquo;
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p
                    className={`mt-1.5 text-[9px] uppercase tracking-[0.2em] text-white/70 font-medium transition-all duration-500 delay-100 ${
                      cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5"
                    }`}
                  >
                    — {heroSlides[activeSlide].label}
                  </p>
                </div>
              </div>
              <div className="relative h-0.5 w-full bg-white/10">
                <div
                  className={`absolute inset-0 bg-gold/80 ${
                    cardVisible
                      ? "w-full opacity-100 slider-progress-bar"
                      : "w-0 opacity-0 slider-progress-reset"
                  }`}
                  key={activeSlide}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="reveal-on-scroll mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="relative aspect-5/4 overflow-hidden rounded-[2.5rem] shadow-xl">
            <img
              src={aboutInterior}
              alt="Warm candlelit interior"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              loading="lazy"
              width={1200}
              height={900}
            />
          </div>
          <div>
            <span className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-olive">
              <span className="h-px w-8 bg-olive/60" /> Our Kitchen
            </span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              A sanctuary built around <span className="italic text-gold">perfection</span> and the
              pursuit of taste.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Rare beans sourced from the volcanic soils of our region, roasted to perfection. We
              believe that every cup should be a moment of absolute luxury.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-terracotta transition-all hover:gap-3"
            >
              Meet the table <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES: 3D CURVED SLIDER */}
      <section className="reveal-on-scroll relative overflow-hidden py-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-olive">
            Tonight's Highlights
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">From the fire</h2>
          <div className="divider-organic mt-6" />
        </div>

        {!featured ? (
          <div className="flex h-187.5 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
              <p className="font-display text-sm uppercase tracking-widest text-gold/60">
                Stoking the fire...
              </p>
            </div>
          </div>
        ) : (
          <div className="banner-3d -mt-6">
            <div
              className="slider-3d"
              style={{ "--quantity": featured?.length || 0 } as React.CSSProperties}
            >
              {featured?.map((item, idx) => (
                <div
                  key={item.id}
                  className="item-3d group"
                  style={{ "--position": idx + 1 } as React.CSSProperties}
                >
                  <div className="card-inner relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-gold/10">
                    {imageForSlug(item.slug) ? (
                      <img
                        src={imageForSlug(item.slug)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-muted" />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#1a0f0a]/90 subpixel-antialiased opacity-0 transition-all duration-500 group-hover:opacity-100">
                      <h3 className="text-shadow-luxe px-6 text-center font-display text-2xl font-medium tracking-wide text-gold">
                        {item.name}
                      </h3>
                      <p className="mb-2 font-display text-sm tracking-[0.2em] text-white/90">
                        {Number(item.price).toLocaleString()} frw
                      </p>
                      <div className="flex flex-col gap-3">
                        <Link
                          to="/menu"
                          className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
                        >
                          Discover
                        </Link>
                        <button
                          onClick={() => {
                            add({
                              id: item.id,
                              slug: item.slug,
                              name: item.name,
                              price: Number(item.price),
                            });
                            toast.success(`Added ${item.name} to your table`);
                          }}
                          className="flex items-center justify-center rounded-full bg-gold px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-ember hover:text-white"
                        >
                          Add to Table
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-7 py-3 text-sm uppercase tracking-[0.22em] transition-colors hover:border-terracotta hover:text-terracotta"
          >
            See the full menu <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="reveal-on-scroll bg-[color-mix(in_oklab,var(--olive)_15%,var(--background))] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                q: "The kind of place you leave feeling slower, better, brighter.",
                a: "Infatuation",
              },
              { q: "A fire-kissed homage to the Mediterranean.", a: "New York Times" },
              { q: "Every plate tastes like somebody's grandmother cared.", a: "Resy Review" },
            ].map((t, idx) => (
              <figure
                key={t.a}
                className={`reveal-on-scroll relative rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm backdrop-blur reveal-delay-${idx * 100 + 200}`}
              >
                <div className="absolute -top-4 left-6 font-display text-6xl leading-none text-terracotta/40">
                  "
                </div>
                <blockquote className="font-display text-xl leading-snug">{t.q}</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  — {t.a}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal-on-scroll mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="font-script text-3xl text-terracotta">come hungry —</p>
        <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
          Order tonight. Eat by the fire at home.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Same kitchen. Same roasted beans. Packed warm in linen-wrapped boxes and waiting at your
          door.
        </p>
        <Link
          to="/menu"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 text-sm uppercase tracking-[0.22em] text-primary-foreground shadow-lg transition-all hover:bg-ember"
        >
          Start your order
        </Link>
      </section>
    </SiteLayout>
  );
}
