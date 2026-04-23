import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { formatPrice } from "@/lib/cart";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { LogOut, RefreshCw } from "lucide-react";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Status = Database["public"]["Enums"]["order_status"];

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "Your Order — Aslan Cafe Luxe & Resto" },
      { property: "og:title", content: "Your Order — Aslan Cafe Luxe & Resto" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffDashboard,
});

const STATUSES: Status[] = ["new", "preparing", "ready", "delivered", "cancelled"];

const statusStyles: Record<Status, string> = {
  new: "bg-terracotta text-primary-foreground",
  preparing: "bg-gold text-foreground",
  ready: "bg-olive text-primary-foreground",
  delivered: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/80 text-destructive-foreground",
};

function StaffDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [isStaff, setIsStaff] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthed(false);
        navigate({ to: "/staff/login" });
      } else {
        setAuthed(true);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate({ to: "/staff/login" });
      } else {
        setAuthed(true);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id);
      const hasStaff = (roles ?? []).some((r) => r.role === "staff" || r.role === "admin");
      setIsStaff(hasStaff);
    })();
  }, [authed]);

  async function loadOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      toast.error(error.message);
    } else {
      setOrders(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!isStaff) return;
    loadOrders();
    const channel = supabase
      .channel("orders-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        loadOrders();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isStaff]);

  async function updateStatus(id: string, status: Status) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Marked ${status}`);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/staff/login" });
  }

  if (authed === null)
    return <div className="p-10 text-center text-muted-foreground">Loading…</div>;

  if (authed && isStaff === false) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="font-display text-3xl">Access pending</h1>
        <p className="mt-4 text-muted-foreground">
          Your account doesn't have staff access yet. Ask an admin to grant you the{" "}
          <code>staff</code> role.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={signOut}
            className="rounded-full border border-border px-5 py-2 text-sm hover:border-terracotta"
          >
            Sign out
          </button>
          <Link
            to="/"
            className="rounded-full bg-terracotta px-5 py-2 text-sm text-primary-foreground hover:bg-ember"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <span className="font-script text-2xl text-terracotta">Aslan Cafe Luxe & Resto</span>
            <h1 className="font-display text-xl leading-tight">Orders Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-terracotta"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-terracotta"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUSES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                filter === f
                  ? "bg-terracotta text-primary-foreground"
                  : "border border-border hover:border-terracotta"
              }`}
            >
              {f} {f !== "all" && `(${orders.filter((o) => o.status === f).length})`}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading && <p className="text-muted-foreground">Loading orders…</p>}
          {!loading && filtered.length === 0 && (
            <p className="col-span-full py-16 text-center text-muted-foreground">No orders here.</p>
          )}
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} onUpdate={updateStatus} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  onUpdate,
}: {
  order: Order;
  onUpdate: (id: string, s: Status) => void;
}) {
  const items = (order.items as Array<{ name: string; quantity: number; price: number }>) ?? [];

  return (
    <article className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg">{order.order_number}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${statusStyles[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          <span className="text-muted-foreground">Customer:</span> {order.customer_name}
        </p>
        <p>
          <span className="text-muted-foreground">Phone:</span> {order.customer_phone}
        </p>
        <p>
          <span className="text-muted-foreground">Address:</span> {order.address}
        </p>
        {order.notes && (
          <p>
            <span className="text-muted-foreground">Notes:</span> {order.notes}
          </p>
        )}
      </div>

      <ul className="mt-4 space-y-1 border-t border-border/60 pt-3 text-sm">
        {items.map((i, idx) => (
          <li key={idx} className="flex justify-between">
            <span>
              {i.quantity}× {i.name}
            </span>
            <span className="text-muted-foreground">{formatPrice(i.price * i.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-border/60 pt-3 font-display text-lg">
        <span>Total</span>
        <span className="text-terracotta">{formatPrice(Number(order.total))}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            disabled={order.status === s}
            onClick={() => onUpdate(order.id, s)}
            className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-terracotta disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
    </article>
  );
}
