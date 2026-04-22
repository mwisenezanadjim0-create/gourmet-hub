import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/login")({
  head: () => ({
    meta: [
      { title: "Staff Login — Olea & Ember" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffLoginPage,
});

function StaffLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/staff` },
        });
        if (error) throw error;
        toast.success("Account created. An admin must grant you staff access.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/staff" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-md flex-col items-center px-6 py-20">
        <span className="font-script text-3xl text-terracotta">back of house</span>
        <h1 className="mt-2 font-display text-4xl">Staff Portal</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full space-y-5 rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-lg backdrop-blur"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-terracotta"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-muted-foreground">Password</span>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none focus:border-terracotta"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-terracotta py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground hover:bg-ember disabled:opacity-60"
          >
            {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-center text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-terracotta"
          >
            {mode === "signin" ? "Need an account?" : "Already have one? Sign in"}
          </button>
        </form>

        <Link to="/" className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-terracotta">
          ← Back to site
        </Link>
      </section>
    </SiteLayout>
  );
}
