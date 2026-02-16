## Project Summary
Spiti Traverse is a high-impact, aesthetic solo travel website for exploring the rugged terrain of Spiti Valley, Himachal Pradesh, India. It provides curated traversal paths, affordable homestay recommendations, local Himalayan food guides, and a high-tech "Live Tracking" visualization system for independent travelers.

## Tech Stack
- Frontend: React + Vite (migrated from Next.js)
- Backend: Express (Node.js) + MongoDB
- Serverless Functions: Vercel (api/index.js)
- Styling: Tailwind CSS 4
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Syne (Headings), Plus Jakarta Sans (Body)
- Components: Radix UI / Shadcn UI

## Architecture
- `client/`: React + Vite Frontend
    - `src/components/`: Modular UI components
    - `src/App.jsx`: Main application entry
- `backend/`: Express + Node + MongoDB Backend
    - `index.js`: Server entry (exported for Vercel)
- `api/`: Vercel Function entry points
- `public/`: Shared static assets

## User Preferences
- Indian Version: Focused on Spiti Valley, Himalayas.
- High visual accuracy and "iconic" imagery of the Indian Himalayas.
- Dark theme with sharp, premium accents.
- Distinctive typography (Syne & Plus Jakarta Sans).
- Minimalist but information-dense "tracking" UI.

## Deployment
- Framework: Vite / MERN
- Vercel Build Command: `npm run build`
- Vercel Output Directory: `client/dist`

## Guidelines
- Use relative URLs for client-side API calls (`/api/...`).
- Maintain a cohesive "adventure navigation" aesthetic throughout.
- Avoid technical jargon in user-facing copy.
- Mobile-responsive design with focus on high-impact visual moments.
