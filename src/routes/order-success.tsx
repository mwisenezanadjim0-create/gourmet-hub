import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/order-success")({
  validateSearch: (search) =>
    z
      .object({ order: z.string().optional() })
      .parse(search),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Aslan Cafe Luxe & Resto" },
      { name: "description", content: "Thank you — your order is in." },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { order } = Route.useSearch();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-terracotta/10">
          <CheckCircle2 className="h-10 w-10 text-terracotta" />
        </div>
        <span className="mt-8 block font-script text-3xl text-terracotta">grazie</span>
        <h1 className="mt-2 font-display text-5xl">Your order is in</h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          Our kitchen has it. We'll send a call if we have any questions.
          Expect delivery within 45–60 minutes.
        </p>

        {order && (
          <div className="mx-auto mt-10 inline-block rounded-2xl border border-border/60 bg-card/80 px-8 py-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Order Number</p>
            <p className="mt-1 font-display text-2xl tracking-wider text-terracotta">{order}</p>
          </div>
        )}

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-foreground/30 px-7 py-3 text-sm uppercase tracking-[0.22em] hover:border-terracotta hover:text-terracotta"
          >
            Back to home
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
