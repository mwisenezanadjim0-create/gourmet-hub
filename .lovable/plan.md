# Warm Artisan Restaurant Website

A creative, farm-to-table inspired restaurant site with online ordering, payments, and a staff dashboard.

## Visual Direction

- **Palette**: terracotta, cream, deep olive, charcoal, warm gold accents
- **Typography**: elegant serif display (e.g., Fraunces) for headings + handwritten accent font for flourishes + clean sans for body
- **Feel**: textured paper backgrounds, organic blob shapes, hand-drawn dividers, generous whitespace, asymmetric editorial layouts, subtle grain, gentle scroll reveals
- **Imagery**: rich, moody food photography (AI-generated) with soft natural light

## Pages / Routes

1. **Home (`/`)** — Hero with signature dish, "our story" teaser, featured menu items, testimonials strip, CTA to order
2. **Menu (`/menu`)** — Full menu by category (Starters, Mains, Desserts, Drinks), each dish with its own generated image, price, description, and "Add to cart" button
3. **About (`/about`)** — Restaurant story, gallery grid of restaurant interior/kitchen/chef photos
4. **Order / Cart (`/cart`)** — Review items, adjust quantities, customer info (name, phone, address, notes), "Pay & Place Order" via Stripe
5. **Order Confirmation (`/order-success`)** — Thank-you page with order number after payment
6. **Staff Login (`/staff/login`)** — Email/password sign-in for employees
7. **Staff Dashboard (`/staff`)** — Protected live list of orders with status controls: New → Preparing → Ready → Delivered. Filters by status, shows customer info, items, total, timestamp

## Shared UI

- **Header**: restaurant logo (wordmark), nav (Home / Menu / About / Order), cart icon with item count
- **Footer**: owner name, phone number, email, address, hours, social icons, copyright

## Ordering & Payment Flow

- Cart state persisted in localStorage
- Checkout triggers Stripe-hosted payment (Lovable built-in Stripe Payments, no account needed)
- On successful payment webhook → order saved to DB with status "new"
- Customer gets confirmation page; staff dashboard shows it live

## Employee Dashboard

- Login via Lovable Cloud auth (email/password)
- Role-based access: only users with `staff` role can view/update orders (roles stored in separate `user_roles` table for security)
- Live-updating orders list (polling or realtime)
- Click an order → view full details, change status via buttons
- Seeded with one demo staff account you can log in with

## Data Model (Lovable Cloud)

- `menu_items` — name, description, price, category, image_url, available
- `orders` — customer name, phone, address, notes, items (JSON), total, status, stripe_session_id, created_at
- `profiles` + `user_roles` (app_role enum: 'staff', 'admin') with `has_role()` security-definer function
- RLS: public read on menu; orders insert via server function after payment; only staff can read/update orders

## Placeholder Content

- Invented restaurant: **"Olea & Ember"** — rustic Mediterranean
- ~10 menu items across 4 categories, each with AI-generated food imagery
- 6 about-page interior/kitchen photos
- Sample owner contact in footer

## Setup Needed After Plan Approval

- Enable Lovable Cloud (database + auth)
- Enable Lovable's built-in Stripe Payments (test mode instantly, no account required)
- Generate food and restaurant imagery
- Create demo staff login and share credentials with you
