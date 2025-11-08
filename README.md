# ARMenu - Interactive Digital Menu with AR

A web-based platform for restaurants and coffee shops that replaces traditional paper menus with an interactive, mobile-friendly digital experience. Customers can scan a QR code to access the menu and view dishes in augmented reality.

## Features

- 📱 **Mobile-First Design** - Responsive layout optimized for smartphones
- 🎨 **Warm Café Aesthetic** - Beautiful color palette and modern design
- 🥘 **Categorized Menu** - Organize items by categories (Starters, Main Courses, Desserts, Drinks)
- 🎯 **AR Viewing** - View 3D models of dishes in augmented reality via Sketchfab
- ⚡ **No App Required** - Works directly in mobile browsers
- 🎭 **Smooth Animations** - Polished user experience with transitions

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Prisma** - Database ORM
- **Supabase** - PostgreSQL database
- **Sketchfab** - 3D model hosting and AR viewing

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- Supabase account with a PostgreSQL database

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up your database connection in `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

3. Generate Prisma client and push schema to database:
```bash
pnpm prisma generate
pnpm prisma db push
```

4. (Optional) Open Prisma Studio to manage data:
```bash
pnpm prisma studio
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses three main models:

- **Restaurant** - Stores restaurant information (name, logo, description)
- **Category** - Menu categories (Starters, Main Courses, etc.)
- **MenuItem** - Individual menu items with name, price, description, image, and AR model URL

## Adding Menu Data

You can add menu data through Prisma Studio or directly in your Supabase dashboard:

1. Create a Restaurant record with your restaurant details
2. Create Categories linked to the restaurant
3. Create MenuItems linked to both the restaurant and a category

### AR Model Setup

1. Upload your GLB 3D model files to Sketchfab
2. Get the model ID from the Sketchfab URL (e.g., `https://sketchfab.com/models/YOUR-MODEL-ID`)
3. Store the model ID in the `arModelUrl` field of your MenuItem

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page (fetches restaurant data)
│   └── globals.css      # Global styles
├── components/
│   ├── MenuPage.tsx     # Main menu display component
│   └── ARViewer.tsx     # AR viewer modal with Sketchfab iframe
├── lib/
│   └── prisma.ts        # Prisma client instance
└── prisma/
    └── schema.prisma    # Database schema
```

## Color Palette

- Primary: `#A0805D`
- Accent: `#A5835E`
- Highlight: `#B1906A`
- Shadow: `#9D7B55`
- Background: `#FFFFFF`

## Deployment

The application can be deployed to Vercel, Netlify, or any platform that supports Next.js.

Make sure to:
1. Set the `DATABASE_URL` environment variable
2. Run `pnpm prisma generate` during build
3. Ensure your database is accessible from the deployment platform

## License

MIT

