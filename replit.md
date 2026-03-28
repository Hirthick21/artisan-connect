# ARTNET - Handcrafted Marketplace

## Overview
A marketplace app for handcrafted goods (pottery, textiles, woodwork, metal craft, etc.) built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui components. Migrated from Lovable to Replit.

## Architecture
- **Frontend only** – pure React SPA, no backend server
- **Routing**: React Router v6
- **State/Data**: React Context (AuthContext, CartContext) + TanStack React Query
- **UI**: shadcn/ui + Radix UI primitives + Tailwind CSS
- **Forms**: React Hook Form + Zod validation

## Key Pages
- `/` – HomePage (hero carousel, featured products)
- `/browse` – BrowsePage (filter/search products)
- `/product/:id` – ProductDetailPage
- `/cart` – CartPage
- `/checkout` – CheckoutPage
- `/orders` – OrdersPage
- `/login` – LoginPage
- `/seller` – SellerDashboard
- `/seller/products` – SellerProductsPage
- `/admin` – AdminDashboard

## Development
```bash
npm run dev     # start dev server on port 5000
npm run build   # production build
```

## Replit Configuration
- Dev server runs on port 5000 (webview)
- Vite configured with `host: "0.0.0.0"` and `allowedHosts: true` for Replit proxy
- `lovable-tagger` removed (incompatible with Vite 8)

## Deployment
- Build command: `npm run build`
- Run command: `node ./dist/index.cjs`
