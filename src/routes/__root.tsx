import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/lib/cart";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-terracotta">404</h1>
        <h2 className="mt-4 font-display text-2xl">This page has drifted away</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for isn't on tonight's menu.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-2.5 text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-ember"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Aslan Cafe Luxe & Resto — Luxury Dining & Exquisite Flavors" },
      {
        name: "description",
        content:
          "Aslan Cafe Luxe & Resto offers a premium dining experience in Kigali. Luxury atmosphere, gourmet flavors, and exceptional service.",
      },
      { name: "author", content: "Aslan Cafe" },
      { property: "og:title", content: "Aslan Cafe Luxe & Resto — Luxury Dining" },
      {
        property: "og:description",
        content: "Experience the pinnacle of luxury dining and gourmet flavors in Kigali.",
      },
      { property: "og:image", content: "/hero-cinematic.png" },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0c0705" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "icon", href: "/aslanlogo.png" },
      { rel: "apple-touch-icon", href: "/aslanlogo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Caveat:wght@500;600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
        <Toaster richColors position="top-center" />
      </CartProvider>
    </QueryClientProvider>
  );
}
