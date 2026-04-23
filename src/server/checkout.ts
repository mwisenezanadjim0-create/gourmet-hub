import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const customerSchema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  customer_phone: z.string().trim().min(6).max(30),
  customer_email: z.string().trim().email().max(200).optional().or(z.literal("")),
  address: z.string().trim().min(5).max(300),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

const itemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  quantity: z.number().int().min(1).max(50),
});

const inputSchema = z.object({
  customer: customerSchema,
  items: z.array(itemSchema).min(1).max(50),
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    // Server-side re-price: look up each item to prevent tampering
    const ids = data.items.map((i) => i.id);
    const { data: dbItems, error: dbErr } = await supabaseAdmin
      .from("menu_items")
      .select("id,name,price,available")
      .in("id", ids);

    if (dbErr) {
      console.error("menu lookup failed", dbErr);
      throw new Error("Could not validate cart");
    }

    const byId = new Map(dbItems?.map((i) => [i.id, i]) ?? []);
    const verifiedItems = data.items.map((i) => {
      const row = byId.get(i.id);
      if (!row || !row.available) throw new Error(`Item not available: ${i.name}`);
      return {
        id: i.id,
        name: row.name,
        price: Number(row.price),
        quantity: i.quantity,
        line_total: Number(row.price) * i.quantity,
      };
    });

    const subtotal = verifiedItems.reduce((s, i) => s + i.line_total, 0);
    const tax = Math.round(subtotal * 0.08875 * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    // Create order row (paid=false until payment webhook).
    // When Stripe is enabled, we'll create a Checkout Session here and
    // return its URL. For now we use a cash-on-delivery fallback so the
    // full user flow is testable end-to-end.
    const customerEmail = data.customer.customer_email?.trim() || null;

    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customer.customer_name,
        customer_phone: data.customer.customer_phone,
        customer_email: customerEmail,
        address: data.customer.address,
        notes: data.customer.notes?.trim() || null,
        items: verifiedItems,
        subtotal,
        total,
        paid: false,
        status: "new",
      })
      .select("id, order_number")
      .single();

    if (orderErr || !order) {
      console.error("order insert failed", orderErr);
      throw new Error("Could not create order");
    }

    // TODO (Stripe): create a Checkout Session and return checkoutUrl.
    // Once enabled, this handler will:
    //   1. build line_items from verifiedItems
    //   2. call Stripe.checkout.sessions.create with metadata.order_id
    //   3. persist session.id to orders.stripe_session_id
    //   4. return { checkoutUrl: session.url }
    return {
      checkoutUrl: null as string | null,
      orderNumber: order.order_number,
    };
  });
