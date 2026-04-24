import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { imageForSlug } from "@/lib/menu-images";
import { useCart, formatPrice } from "@/lib/cart";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Aslan Cafe Luxe & Resto" },
      {
        name: "description",
        content: "Explore our gourmet menu featuring luxury dishes and exquisite flavors.",
      },
      { property: "og:title", content: "Menu — Aslan Cafe Luxe & Resto" },
      {
        property: "og:description",
        content: "Gourmet flavors and luxury dishes from our kitchen in Kigali.",
      },
    ],
  }),
  component: MenuPage,
});

const CATEGORY_ORDER = ["Starters", "Mains", "Desserts", "Drinks"];

function MenuPage() {
  const { add } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["menu-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true)
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

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
  }, [data]);

  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: (data ?? []).filter((i) => i.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <SiteLayout>
      <section className="reveal-on-scroll mx-auto max-w-6xl px-6 pb-8 pt-16 text-center">
        <span className="font-script text-2xl md:text-3xl text-terracotta">the menu</span>
        <h1 className="mt-2 font-display text-4xl md:text-6xl">A seasonal table</h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          We change things often. Seasonality leads; the rest follows. Everything is made in-house,
          from the bread to the pasta.
        </p>
        <div className="divider-organic mx-auto mt-8" />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">d
        {isLoading && <p className="py-20 text-center text-muted-foreground">Loading the menu…</p>}

        <div className="space-y-20">
          {grouped.map((group) => (
            <div key={group.category} className="reveal-on-scroll">
              <div className="mb-10 flex items-center gap-6">
                <h2 className="font-display text-2xl md:text-4xl">{group.category}</h2>
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                {group.items.map((item, idx) => (
                  <article
                    key={item.id}
                    className={`reveal-on-scroll group flex flex-col sm:flex-row gap-5 rounded-2xl md:rounded-[2rem] border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-xl reveal-delay-${(idx % 6) * 100 + 100} ${
                      idx % 2 === 1 ? "md:translate-y-6" : ""
                    }`}
                  >
                    <div className="relative aspect-square w-full sm:w-36 md:w-40 shrink-0 overflow-hidden rounded-xl md:rounded-2xl">
                      {imageForSlug(item.slug) ? (
                        <img
                          src={imageForSlug(item.slug)}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          width={768}
                          height={768}
                        />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-lg md:text-xl leading-tight">{item.name}</h3>
                        <span className="font-display text-base md:text-lg text-terracotta">
                          {formatPrice(Number(item.price))}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <button
                        onClick={() => {
                          add({
                            id: item.id,
                            slug: item.slug,
                            name: item.name,
                            price: Number(item.price),
                          });
                          toast.success(`Added ${item.name} to cart`);
                        }}
                        className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-terracotta/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-terracotta transition-colors hover:bg-terracotta hover:text-primary-foreground"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
