## Project Summary
Spiti Traverse is a high-impact, aesthetic solo travel website for exploring the rugged terrain of Spiti Valley, Himachal Pradesh, India. It provides curated traversal paths, affordable homestay recommendations, local Himalayan food guides, and a high-tech "Live Tracking" visualization system for independent travelers.

## Tech Stack
- Framework: Next.js 15 (App Router, Turbopack) - MERN Stack (MongoDB, Express patterns via Next.js API, React, Node.js).
- Styling: Tailwind CSS 4
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Syne (Headings), Plus Jakarta Sans (Body)
- Components: Radix UI / Shadcn UI

## Architecture
- `frontend/`: React + Vite Frontend
    - `src/components/`: Modular UI components
    - `src/App.tsx`: Main application entry
- `backend/`: Express + Node + MongoDB Backend
    - `index.js`: Server entry and DB connection
- `public/`: Shared static assets


## User Preferences
- Indian Version: Focused on Spiti Valley, Himalayas.
- High visual accuracy and "iconic" imagery of the Indian Himalayas.
- Dark theme with sharp, premium accents.
- Distinctive typography (Syne & Plus Jakarta Sans).
- Minimalist but information-dense "tracking" UI.

## Project Guidelines
- No technical jargon in user-facing copy.
- Mobile-responsive design with focus on high-impact visual moments.
- Use relative URLs for client-side API calls.
- Maintain a cohesive "adventure navigation" aesthetic throughout.

## Common Patterns
- Section-based navigation with backdrop-blur navbars.
- `framer-motion` for staggered reveals and micro-interactions.
- Ken Burns effect for hero background images.
- Border-based accents and high contrast text (black/white/zinc).
