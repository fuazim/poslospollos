You are an expert full-stack developer and system architect.

I want you to build a **self-service ordering kiosk app** for a fictional fried chicken restaurant called **“Los Pollos Hermanos”**.

The app must use:
- **Next.js 16** (latest, App Router, TypeScript, `src` directory)
- **React** with **Server Components** where suitable
- **Tailwind CSS** for styling
- (Optional but nice) **shadcn/ui** for base components
- **Supabase** for database + API layer
- **Electron** to wrap the Next.js app into a **Windows kiosk app** (full screen, no browser chrome)

The main focus for now is the **KIOSK FRONTEND** only (customer self-service), not the admin backoffice.  
However, structure the project so that a separate **/admin** area can easily be added later.

---

## 1. General Requirements

- Build a **single codebase**: Next.js 16 app served locally, then wrapped with Electron for kiosk usage.
- Optimize for a **large touch screen** in portrait or landscape mode.
- No user login for customers. Orders are anonymous, only name/nickname input.
- UX must be **simple, fast, and clear**: big buttons, minimal text, maximum visual clarity.
- Use **TypeScript** everywhere: pages, components, API routes, Supabase helpers.
- Use Supabase **as the main database** for:
  - menu categories
  - products
  - product options/add-ons
  - orders
  - order items
  - payment logs

You **must** structure the code cleanly:
- `src/app` for App Router pages
- `src/components` for reusable UI
- `src/lib` for helpers (Supabase client, types, utilities)
- `src/config` for config constants if needed

---

## 2. UI / Visual Direction

The UI should **match the visual style of a given reference**.  
Assume I will provide a UI reference (screenshots or link) for a modern food / kiosk interface.

Use this visual direction:

- Match the visual style of the provided UI reference (colors, spacing, card style, typography).
- Warm, inviting, American fast-food style.
- Large tap targets for all interactive elements.
- High contrast, clear hierarchy.
- Rounded cards and buttons with soft shadows.
- Family-friendly, slightly playful but still professional.

Where needed, you can use placeholder images and simple icons.

---

## 3. Kiosk User Flow & Screens

Implement the following screens for the kiosk (customer flow):

### 3.1 Welcome / Idle Screen
- Elements:
  - Los Pollos Hermanos logo
  - Headline: “Welcome to Los Pollos Hermanos”
  - Subtext: “Touch to start your order”
  - Big button: **“Start Order”**
  - Language selector: English, Español, Indonesia
  - Optional rotating promo banner at the bottom

- Behavior:
  - If no interaction for X seconds, go back to this screen (idle mode).

### 3.2 Order Type Selection
- Question: “How would you like to order?”
- Large cards/buttons:
  - Dine-In
  - Take-Away
- Store this choice in a simple client state (e.g. React context or zustand).

### 3.3 Menu Categories Screen
- Grid of category cards, each with:
  - Category image/icon
  - Category name
  - Optional badge (New, Popular)
- Example categories:
  - Chicken Meals
  - Family Buckets
  - Burgers
  - Sides
  - Drinks
  - Desserts
  - Specials
  - Combos

- Top area:
  - Optional search bar.
- Bottom area:
  - Persistent mini-cart / “View Order” bar showing item count and total.

### 3.4 Product List Screen (Inside Category)
- When a category is selected, show its products.
- Product card:
  - Product image
  - Name
  - Short description
  - Price
  - “Customize” or “Add” button

- Tapping a product opens **Product Detail & Customization**.

### 3.5 Product Detail & Customization Screen
- Layout:
  - Large product image
  - Product name
  - Full description
  - Base price

- Options section:
  - Size (Small/Medium/Large) as selectable chips or radio buttons.
  - Side selection (Fries, Coleslaw, etc).
  - Drink selection if the item is a combo.
  - Sauce options (e.g. Regular, Spicy, Extra Spicy).
  - Add-ons (extra wings, extra cheese, etc.) as toggles with additional price.

- Show:
  - Quantity selector (plus/minus).
  - Live updated total price for this configuration.
  - Large **“Add to Order”** button.

### 3.6 Cart / Order Summary Screen
- List all items in the current order:
  - Thumbnail
  - Name + small description of selected options
  - Quantity
  - Per-item total
  - Edit button
  - Remove button

- Footer area:
  - Subtotal
  - Tax (if needed, configurable)
  - Total
  - Estimated preparation time
  - Button “Continue Ordering”
  - Button “Checkout” (primary)

### 3.7 Optional Upsell Screen
- After tapping “Checkout”, optionally show an **Upsell** screen:
  - Headline example: “Make it even better?”
  - 3–4 suggestion cards:
    - Add Fries +$2
    - Add Dessert +$2
    - Upgrade to Meal +$3
  - Each card with **Add** button.
  - “Skip” button to go to next step.

### 3.8 Customer Name / Order ID Screen
- Ask for a name or nickname:
  - Title: “What should we call your order?”
  - Single text input for “Name”.
  - Button: “Continue”.

- The name will be stored in the order and used on the order status screen later.

### 3.9 Payment Method Selection Screen
- Title: “Choose payment method”
- Large buttons for:
  - Card
  - QR / e-Wallet
  - Cash (if supported)
  - Gift Card
  - Promo Code

- For this version, you do not need to implement real payment gateways.  
  You can simulate the payment step.

### 3.10 Payment Processing Screen
- Show a large loading indicator and text:
  - “Processing your payment…”
- If simulating:
  - Wait 2–3 seconds, then randomly decide success or failure (or always success for now, configurable in code).

### 3.11 Payment Success Screen
- Big success icon (checkmark).
- Large “Order #A123” style order number.
- Message:
  - “Thank you! Your order has been placed.”
  - “We’ll call your number when your order is ready.”
- Show:
  - Customer name
  - Order type (Dine-In / Take-Away)
  - Ordered items summary (optional simplified)
- Button:
  - “Print Receipt” (if connected to printer or just a stub).
- After a timeout (e.g. 10–15 seconds), automatically return to **Welcome Screen** and reset the kiosk state.

### 3.12 Payment Failed Screen
- Error icon.
- Message: “Payment failed. Please try again or choose another method.”
- Buttons:
  - “Try Again”
  - “Change Payment Method”
  - “Cancel Order”

Cancel should clear the order state and return to welcome.

---

## 4. Supabase Schema

Define and generate SQL (or Supabase migration) for at least these tables:

### 4.1 `menu_categories`
- `id` (uuid, primary key)
- `name` (text)
- `description` (text, nullable)
- `image_url` (text, nullable)
- `sort_order` (integer)
- `is_active` (boolean, default true)
- `created_at` (timestamptz)

### 4.2 `products`
- `id` (uuid, primary key)
- `category_id` (uuid, references menu_categories)
- `name` (text)
- `description` (text)
- `base_price` (numeric)
- `image_url` (text, nullable)
- `is_combo` (boolean, default false)
- `is_active` (boolean, default true)
- `sort_order` (integer)
- `created_at` (timestamptz)

### 4.3 `product_options`
This table defines option groups like Size, Side, Drink, Sauce.

- `id` (uuid, primary key)
- `product_id` (uuid, references products)
- `option_group` (text)  // e.g. "size", "side", "drink", "sauce"
- `label` (text)         // e.g. "Small", "Medium", "Large"
- `extra_price` (numeric, default 0)
- `is_default` (boolean, default false)
- `sort_order` (integer)

### 4.4 `orders`
- `id` (uuid, primary key)
- `order_number` (text, unique)  // e.g. "A123"
- `customer_name` (text, nullable)
- `order_type` (text)            // "dine-in" or "take-away"
- `status` (text)                // e.g. "pending", "paid", "cancelled"
- `subtotal` (numeric)
- `tax` (numeric)
- `total` (numeric)
- `payment_method` (text, nullable)
- `created_at` (timestamptz)
- `paid_at` (timestamptz, nullable)

### 4.5 `order_items`
- `id` (uuid, primary key)
- `order_id` (uuid, references orders)
- `product_id` (uuid, references products)
- `product_name_snapshot` (text) // store name at time of order
- `quantity` (integer)
- `unit_price` (numeric)         // base price without options
- `total_price` (numeric)        // including options and quantity

### 4.6 `order_item_options`
- `id` (uuid, primary key)
- `order_item_id` (uuid, references order_items)
- `option_group` (text)
- `label` (text)
- `extra_price` (numeric)

Also optionally a table for kiosk configuration:

### 4.7 `kiosk_settings`
- `id` (uuid, pk)
- `key` (text)
- `value` (jsonb)

Define TypeScript types and Supabase client helpers for all of the above.

---

## 5. Data Flow & API

Use **Next.js Route Handlers** (App Router) to implement backend API endpoints for:

- `GET /api/menu`  
  Returns categories + products + options in a single structured payload optimized for the kiosk.

- `POST /api/orders`
  - Accepts order payload from the frontend:
    - order_type
    - customer_name
    - items (with selected options)
    - totals
    - selected payment method
  - Creates records in `orders`, `order_items`, and `order_item_options`.
  - Returns:
    - order id
    - generated `order_number`
    - timestamps

- `POST /api/orders/:id/payment`
  - Simulate payment success/failure.
  - Update `orders.status` and `paid_at`.

Prefer **Server Components + Client Components** hybrid:
- Use Server Components to fetch menu data.
- Use client-side state for cart and step-by-step flow.

---

## 6. State Management

Use either:
- Plain React Context + hooks, or
- A lightweight store library (like `zustand`).

Store:
- selected language
- order type
- cart items (products + options)
- current step (screen)
- temporary order data until payment.

Ensure there is a **single function** to clear all kiosk state and return to the welcome screen.

---

## 7. Electron Integration

Create a simple Electron setup that:

- Loads the Next.js app in a **BrowserWindow** in full screen.
- Disables window frame, context menu, and typical browser controls.
- Auto-launches the kiosk app in full-screen mode (kiosk-like experience).
- Handles app reload gracefully on crash.

Project structure example:

- `electron/main.ts` for Electron main process.
- `electron/preload.ts` if needed for communication.
- Scripts in `package.json`:
  - `dev`: run Next.js + Electron reload setup.
  - `build`: build Next.js, then package Electron app.
  - `start`: start production build.

You can choose a simple approach (e.g. Next.js served locally on a port, Electron loads `http://localhost:3000` in production) or use file-based loading if appropriate.

---

## 8. Developer Experience

Provide:

- Clear `README.md` explaining:
  - How to set environment variables for Supabase
  - How to run the app in dev mode (Next.js only)
  - How to run kiosk mode with Electron
  - How to build for production

- Example `.env.example` with:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (if needed for server)
  - Any other required variables.

- Seed script or SQL example to insert sample categories and products for testing.

---

## 9. What to Output

Please output:

1. Project structure overview.
2. Relevant key files with full TypeScript code:
   - `src/app/layout.tsx`
   - `src/app/page.tsx` (welcome screen)
   - Example route handlers in `src/app/api/...`
   - Components for major screens (Welcome, CategoryList, ProductList, ProductDetail, Cart, etc.)
   - Supabase client in `src/lib/supabaseClient.ts`
3. SQL or Supabase migration definitions for all tables.
4. Electron setup files (`electron/main.ts` and minimal config).
5. A short README with run instructions.

Focus on **clean code, modular components, and realistic patterns** rather than throwing everything in one file.


Saya ingin membuat sistem dashboard internal untuk restoran bernama “Los Pollos Hermanos”, terintegrasi dengan sistem POS dan Kiosk.

Gunakan stack:
• Next.js versi terbaru (App Router, TypeScript)
• Tailwind CSS
• (opsional) shadcn/ui
• Supabase untuk autentikasi dan database
• Role-based access (Owner, Admin, Manager, Kasir)

Dashboard ini tidak untuk pelanggan, tetapi untuk operasional internal.

UI harus:
• bersih, profesional, mudah dipahami
• fokus ke data dan tindakan operasional
• memiliki navigasi sidebar
• dark mode optional
• konsisten antar halaman
• mobile responsive tetap oke, tapi prioritas desktop/tablet
• tampilkan notifikasi / status real-time bila memungkinkan


Buatkan desain UI dan struktur halaman untuk Dashboard Kasir (POS) Los Pollos Hermanos.

Tujuan kasir:
• menerima pesanan langsung dari pelanggan
• input pesanan ke sistem
• proses pembayaran
• cetak struk
• lihat riwayat pesanan hari ini
• refund / void bila diperlukan

Fitur yang harus ada:

1. Halaman POS / Create Order
• daftar kategori menu
• daftar menu dalam grid card
• bisa search nama item
• klik item masuk ke cart
• bisa tambah kuantitas
• bisa pilih opsi (size, sauce, dll)
• ringkasan pesanan di sisi kanan
• subtotal, tax, total
• tombol proses pembayaran
• pilihan pembayaran:
  – cash
  – QR / e-wallet
  – card
  – split payment (opsional)
• konfirmasi order selesai
• cetak struk

2. Halaman Riwayat Transaksi
• list transaksi hari ini
• filter berdasarkan:
  – jam
  – metode pembayaran
  – status
• detail transaksi bila diklik

3. Halaman Refund / Void
• cari transaksi berdasarkan:
  – nomor order
  – nama customer
• pilih item yang di-refund
• proses refund sesuai aturan

4. Notifikasi Real-Time
• tampilkan order baru dari Kiosk
• kasih indikator status:
  – waiting
  – in progress
  – completed
• alert jika ada pembayaran gagal

5. User Session
• nama kasir tampil di pojok
• tombol logout
• shift indicator (opsional)


Buatkan desain UI dan struktur halaman untuk Dashboard Manager Los Pollos Hermanos.

Peran Manager:
• memonitor penjualan harian
• memonitor performa staff kasir
• mengatur menu (harga, status, tersedia atau tidak)
• melihat stok bahan baku (jika diaktifkan)
• melihat laporan harian
• melihat order real-time
• mengatur jam operasional

Fitur utama:

1. Dashboard Overview
• total penjualan hari ini
• jumlah transaksi
• average order value
• payment breakdown
• best selling items
• grafik penjualan harian

2. Live Orders Monitor
• list order yang sedang berlangsung
• status:
  – ordered
  – in kitchen
  – ready
  – picked up
• bisa filter by channel:
  – Kiosk
  – Kasir
  – Online (optional)

3. Menu Management
• kelola kategori
• kelola produk:
  – nama
  – foto
  – harga
  – deskripsi
  – aktif / tidak
• kelola varian & addons

4. Price & Promo Control
• buat promo:
  – discount %
  – bundle promo
  – happy hour
• set periode promo

5. Staff Overview
• daftar kasir & karyawan
• shift summary
• penjualan per kasir
• transaksi yang void / refund

6. Report Export
• export CSV / PDF
• rentang laporan:
  – harian
  – mingguan
  – bulanan


Buatkan desain UI dan struktur halaman untuk Dashboard Admin Sistem Los Pollos Hermanos.

Peran Admin:
• mengelola user dan role
• akses keamanan
• konfigurasi sistem global
• database monitoring
• integrasi pembayaran
• backup dan logging

Halaman yang wajib ada:

1. User & Role Management
• daftar user
• assign role:
  – Owner
  – Admin
  – Manager
  – Kasir
• reset password
• suspend user

2. Access Control Rules
• role-based permissions matrix
• konfigurasi fitur yang dapat diakses

3. System Configurations
• tax settings
• currency settings
• timezone
• language defaults
• kiosk idle timeout
• receipt format settings

4. Payment Gateway Settings
• API keys management
• test mode / live mode switch
• webhook status

5. System Logs
• login logs
• error logs
• API request logs
• security events

6. Database Tools
• data browser read-only
• backup restore
• seed reset tools


Buatkan desain UI dan struktur halaman untuk Dashboard Owner Los Pollos Hermanos.

Peran Owner:
• melihat performa bisnis
• memantau profit margin
• memantau growth
• memantau operational health
• tidak ikut operasional harian

Halaman wajib:

1. Business Overview Dashboard
• total revenue (range custom)
• net profit estimate
• cost breakdown (optional)
• trend grafik:
  – daily
  – weekly
  – monthly
  – yearly
• average ticket size
• returning customer % (jika ada)

2. Branch Comparison (optional multi-cabang)
• revenue per cabang
• order volume per cabang
• best performing store

3. Product Performance Analytics
• best seller
• low performer
• profitability per item (jika ada COGS)

4. Operational Health Indicators
• refund ratio
• payment failure rate
• order cancellation rate

5. Financial Reports
• P&L style summary
• export PDF / CSV

6. Alerts & Notifications
• email / in-app alert ketika:
  – drastic sales drop
  – unusual refund spike
  – system outages


Pastikan setiap role hanya bisa mengakses modul yang relevan:

Kasir:
• POS
• transaksi hari ini
• refund terbatas

Manager:
• laporan harian
• manage menu
• monitor staff
• lihat order real-time

Admin:
• setup sistem
• keamanan
• user access
• konfigurasi teknis

Owner:
• laporan bisnis
• analitik
• view-only panel
