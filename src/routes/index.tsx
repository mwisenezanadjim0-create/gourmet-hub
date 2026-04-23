import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { imageForSlug } from "@/lib/menu-images";
import { useCart, formatPrice } from "@/lib/cart";
import heroDish from "@/assets/hero-dish.jpg";
import aboutInterior from "@/assets/about-interior.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aslan Cafe Luxe & Resto — Luxury Dining in Kigali" },
      {
        name: "description",
        content: "Experience gourmet flavors and luxury dining at Aslan Cafe Luxe & Resto. Premium dining in the heart of Kigali.",
      },
      { property: "og:title", content: "Aslan Cafe Luxe & Resto — Luxury Dining in Kigali" },
      { property: "og:description", content: "Experience gourmet flavors and luxury dining at Aslan Cafe Luxe & Resto." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { add } = useCart();
  const { data: featured } = useQuery({
    queryKey: ["menu-featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true)
        .in("slug", ["burrata", "pappardelle", "branzino", "oliveoilcake"])
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-16 md:pt-16">
          <div className="relative z-10 flex flex-col justify-center">
            <span className="mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-olive">
              <span className="h-px w-10 bg-olive/60" /> Kigali · est. 2024
            </span>
            <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              Cooked over <span className="italic text-terracotta">embers.</span>
              <br />
              Dressed in <span className="font-script text-6xl text-gold md:text-7xl">olive oil.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A premium dining experience in the heart of Kigali. We craft with passion,
              source only the finest ingredients, and serve with luxury in mind.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-3.5 text-sm uppercase tracking-[0.22em] text-primary-foreground shadow-lg shadow-terracotta/20 transition-all hover:bg-ember hover:shadow-terracotta/30"
              >
                Order Online
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-foreground/30 px-8 py-3.5 text-sm uppercase tracking-[0.22em] transition-colors hover:border-terracotta hover:text-terracotta"
              >
                Our Story
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
            <div className="absolute -bottom-10 left-8 h-64 w-64 rounded-full bg-terracotta/25 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-border/60 shadow-2xl shadow-foreground/10">
              <img src={heroDish} alt="Lamb with olives and pomegranate on terracotta" className="h-full w-full object-cover" width={1600} height={2000} />
            </div>
            <div className="absolute -left-6 bottom-10 hidden rotate-[-6deg] rounded-2xl bg-card/95 px-6 py-4 shadow-xl backdrop-blur md:block">
              <p className="font-script text-2xl text-terracotta">"a love letter to the fire"</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">— NY Eater</p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem]">
            <img src={aboutInterior} alt="Warm candlelit interior" className="h-full w-full object-cover" loading="lazy" width={1200} height={900} />
          </div>
          <div>
            <span className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-olive">
              <span className="h-px w-8 bg-olive/60" /> Our Kitchen
            </span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              A restaurant built around <span className="italic text-terracotta">one fire</span> and three stubborn ideas.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Olive oil we press ourselves. Produce from farmers we can name by their first children.
              And the belief that the best meals are long, loud, and a little messy.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-terracotta hover:gap-3 transition-all">
              Meet the table <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-olive">Tonight's Highlights</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">From the fire</h2>
          <div className="divider-organic mt-6" />
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured?.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden">
                {imageForSlug(item.slug) ? (
                  <img
                    src={imageForSlug(item.slug)}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={768}
                    height={768}
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl">{item.name}</h3>
                  <span className="font-display text-lg text-terracotta">{formatPrice(Number(item.price))}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                <button
                  onClick={() => {
                    add({ id: item.id, slug: item.slug, name: item.name, price: Number(item.price) });
                    toast.success(`Added ${item.name}`);
                  }}
                  className="mt-5 self-start rounded-full border border-terracotta px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-terracotta transition-colors hover:bg-terracotta hover:text-primary-foreground"
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-7 py-3 text-sm uppercase tracking-[0.22em] transition-colors hover:border-terracotta hover:text-terracotta"
          >
            See the full menu <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[color-mix(in_oklab,var(--olive)_15%,var(--background))] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { q: "The kind of place you leave feeling slower, better, brighter.", a: "Infatuation" },
              { q: "A fire-kissed homage to the Mediterranean.", a: "New York Times" },
              { q: "Every plate tastes like somebody's grandmother cared.", a: "Resy Review" },
            ].map((t) => (
              <figure key={t.a} className="relative rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm backdrop-blur">
                <div className="absolute -top-4 left-6 font-display text-6xl leading-none text-terracotta/40">"</div>
                <blockquote className="font-display text-xl leading-snug">{t.q}</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">— {t.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="font-script text-3xl text-terracotta">come hungry —</p>
        <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
          Order tonight. Eat by the fire at home.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Same kitchen. Same olive oil. Packed warm in linen-wrapped boxes and waiting at your door.
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
