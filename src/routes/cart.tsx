import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart, formatPrice } from "@/lib/cart";
import { imageForSlug } from "@/lib/menu-images";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { createCheckoutSession } from "@/server/checkout";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Order — Aslan Cafe Luxe & Resto" },
      { property: "og:title", content: "Your Order — Aslan Cafe Luxe & Resto" },
    ],
  }),
  component: CartPage,
});

const formSchema = z.object({
  customer_name: z.string().trim().min(2, "Name too short").max(100),
  customer_phone: z.string().trim().min(6, "Phone required").max(30),
  customer_email: z.string().trim().email("Invalid email").max(200).optional().or(z.literal("")),
  address: z.string().trim().min(5, "Address required").max(300),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

function CartPage() {
  const { items, setQty, remove, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const checkoutFn = useServerFn(createCheckoutSession);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    address: "",
    notes: "",
  });

  const tax = subtotal * 0.08875;
  const total = subtotal + tax;

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
  }, [items]);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const res = await checkoutFn({
        data: {
          customer: parsed.data,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      });
      if (res.checkoutUrl) {
        clear();
        window.location.href = res.checkoutUrl;
      } else if (res.orderNumber) {
        clear();
        navigate({ to: "/order-success", search: { order: res.orderNumber } });
      } else {
        toast.error("Unable to start checkout");
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <section className="reveal-on-scroll mx-auto max-w-6xl px-6 pb-6 pt-14 text-center">
        <span className="font-script text-3xl text-terracotta">your table</span>
        <h1 className="mt-2 font-display text-5xl">Review your order</h1>
        <div className="divider-organic mx-auto mt-6" />
      </section>

      {items.length === 0 ? (
        <section className="mx-auto max-w-xl px-6 py-16 text-center">
          <p className="text-muted-foreground">Your cart is quiet. Pick something from the fire.</p>
          <Link
            to="/menu"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-terracotta px-7 py-3 text-sm uppercase tracking-[0.2em] text-primary-foreground hover:bg-ember"
          >
            Browse the Menu
          </Link>
        </section>
      ) : (
        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 md:grid-cols-[1.4fr_1fr]">
          {/* Cart list */}
          <div className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={`reveal-on-scroll flex gap-4 rounded-[1.75rem] border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur reveal-delay-${idx * 100 + 100}`}
              >
                <div className="aspect-square w-24 overflow-hidden rounded-xl sm:w-28">
                  {imageForSlug(item.slug) ? (
                    <img
                      src={imageForSlug(item.slug)}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className="h-full w-full bg-muted" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg">{item.name}</h3>
                    <button
                      onClick={() => remove(item.id)}
                      aria-label="Remove"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatPrice(item.price)} each</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1 rounded-full border border-border bg-background">
                      <button
                        className="flex h-8 w-8 items-center justify-center text-foreground/70 hover:text-terracotta"
                        onClick={() => setQty(item.id, item.quantity - 1)}
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm tabular-nums">{item.quantity}</span>
                      <button
                        className="flex h-8 w-8 items-center justify-center text-foreground/70 hover:text-terracotta"
                        onClick={() => setQty(item.id, item.quantity + 1)}
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-display text-lg text-terracotta">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout form */}
          <form
            onSubmit={handleCheckout}
            className="reveal-on-scroll reveal-delay-200 h-fit space-y-5 rounded-[2rem] border border-border/60 bg-card/80 p-7 shadow-lg backdrop-blur"
          >
            <h2 className="font-display text-2xl">Delivery details</h2>

            <Field label="Full name" id="customer_name" required>
              <input
                id="customer_name"
                required
                value={form.customer_name}
                onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
                maxLength={100}
                placeholder="Your full name"
                title="Full name"
                className="field-input"
              />
            </Field>
            <Field label="Phone" id="customer_phone" required>
              <input
                id="customer_phone"
                required
                value={form.customer_phone}
                onChange={(e) => setForm((f) => ({ ...f, customer_phone: e.target.value }))}
                maxLength={30}
                placeholder="Your phone number"
                title="Phone number"
                className="field-input"
              />
            </Field>
            <Field label="Email" id="customer_email">
              <input
                id="customer_email"
                type="email"
                value={form.customer_email}
                onChange={(e) => setForm((f) => ({ ...f, customer_email: e.target.value }))}
                maxLength={200}
                placeholder="Your email address"
                title="Email address"
                className="field-input"
              />
            </Field>
            <Field label="Delivery address" id="address" required>
              <input
                id="address"
                required
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                maxLength={300}
                placeholder="Full delivery address"
                title="Delivery address"
                className="field-input"
              />
            </Field>
            <Field label="Notes for the kitchen" id="notes">
              <textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                maxLength={500}
                placeholder="Any special instructions?"
                title="Notes for the kitchen"
                className="field-input resize-none"
              />
            </Field>

            <div className="space-y-2 border-t border-border pt-5 text-sm">
              <Row
                label={`Subtotal (${count} item${count === 1 ? "" : "s"})`}
                value={formatPrice(subtotal)}
              />
              <Row label="Tax" value={formatPrice(tax)} />
              <Row label="Total" value={formatPrice(total)} bold />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-terracotta py-3.5 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-ember disabled:opacity-60"
            >
              {submitting ? "Processing…" : "Pay & Place Order"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Secure checkout · powered by Stripe
            </p>
          </form>
        </section>
      )}

      <style>{`
        .field-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .field-input:focus {
          border-color: var(--terracotta);
        }
      `}</style>
    </SiteLayout>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label} {required && <span className="text-terracotta">*</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div
      className={`flex justify-between ${bold ? "font-display text-lg text-foreground" : "text-muted-foreground"}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
