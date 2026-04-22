import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import interior from "@/assets/about-interior.jpg";
import chef from "@/assets/about-chef.jpg";
import kitchen from "@/assets/about-kitchen.jpg";
import olivegrove from "@/assets/about-olivegrove.jpg";
import table from "@/assets/about-table.jpg";
import market from "@/assets/about-market.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Olea & Ember" },
      { name: "description", content: "The story behind Olea & Ember: one fire, handmade olive oil, and farmers we know by name." },
      { property: "og:title", content: "Our Story — Olea & Ember" },
      { property: "og:description", content: "Rustic Mediterranean, handmade olive oil, and a kitchen built around fire." },
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

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center">
        <span className="font-script text-3xl text-terracotta">a small restaurant</span>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">Cooking slowly, on purpose.</h1>
        <p className="mx-auto mt-6 text-lg leading-relaxed text-muted-foreground">
          Olea &amp; Ember began in 2019 as a tiny counter in Williamsburg with one wood-burning oven,
          four stools, and a bottle of olive oil pressed from Mira's family grove outside Kalamata.
          It has grown — a little — but those three things still anchor the kitchen.
        </p>
        <div className="divider-organic mx-auto mt-10" />
      </section>

      {/* Gallery — asymmetric grid */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
          <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-[2rem] md:col-span-7 md:row-span-2 md:aspect-auto">
            <img src={gallery[0].src} alt={gallery[0].alt} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
          </div>
          <div className="col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-5 md:aspect-[5/4]">
            <img src={gallery[1].src} alt={gallery[1].alt} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
          </div>
          <div className="col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-5 md:aspect-[5/4]">
            <img src={gallery[2].src} alt={gallery[2].alt} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
          </div>
          <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-[2rem] md:col-span-4 md:aspect-[4/3]">
            <img src={gallery[3].src} alt={gallery[3].alt} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
          </div>
          <div className="col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-4 md:aspect-[4/3]">
            <img src={gallery[4].src} alt={gallery[4].alt} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
          </div>
          <div className="col-span-1 aspect-square overflow-hidden rounded-[2rem] md:col-span-4 md:aspect-[4/3]">
            <img src={gallery[5].src} alt={gallery[5].alt} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-14 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Three stubborn ideas</h2>
          <ul className="mt-6 space-y-5 text-muted-foreground">
            <li>
              <span className="font-display text-lg text-foreground">Fire, always.</span><br />
              One oven. One flame. Every dish says hello to it.
            </li>
            <li>
              <span className="font-display text-lg text-foreground">Oil as a condiment.</span><br />
              Our family press arrives twice a year. It finishes almost everything.
            </li>
            <li>
              <span className="font-display text-lg text-foreground">Small farms we know.</span><br />
              We cook what's grown within a day's drive. The menu follows the harvest.
            </li>
          </ul>
        </div>

        <div className="rounded-[2.5rem] border border-border/60 bg-card/70 p-8 backdrop-blur">
          <p className="font-script text-3xl text-terracotta">— Mira Kavalis</p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">Owner & Chef</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            "I grew up eating at my grandmother's table in Kalamata, where a good meal meant
            a long one. Olea &amp; Ember is my attempt to pass that on — a plate of bread,
            a glass of something honest, and the rest of the night figuring itself out."
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
