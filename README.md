# Reeon Lance Tobia — Portfolio

Full-stack portfolio built with React + Vite (frontend) and Node.js + Express (backend), using Firebase for data storage and Supabase for admin authentication.

## Stack

| Layer | Choice |
|---|---|
| Frontend | React 19 + Vite 8 |
| Backend | Node.js 20 + Express 5 |
| Database | Firebase Firestore |
| Auth | Supabase (admin only) |
| Hosting | Railway |

**Key packages (server):** express ^5.2.1, firebase-admin ^13.10.0, @supabase/supabase-js ^2.109.0, dotenv ^18.0.5, cors ^2.8.6, ws ^8
**Key packages (client):** react ^19.2.8, react-router-dom ^7.18.4, axios ^1.20.0, @supabase/supabase-js ^2.109.0

## Local Development

### Prerequisites
- Node.js 20+
- Firebase project with Firestore enabled
- Supabase project

### Setup

1. Clone the repo
2. Set up environment variables:

**server/.env**
```
PORT=3000
CLIENT_URL=http://localhost:5173
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**client/.env**
```
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Install dependencies:
```bash
cd server && npm install
cd client && npm install
```

4. Seed initial data:
```bash
cd server && node seed.js
```

5. Place resume in public folder:
```
client/public/Resume_RLT.pdf
```

6. Run both servers:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Admin: http://localhost:5173/login

## Features

### Public
- **Hero** — name, title, tagline, CTA buttons, resume download
- **About** — bio, photo, stats (editable from Firebase)
- **Projects** — featured project card + grid, tech stack, GitHub links
- **Skills** — grouped skill pills in a clean grid
- **Contact** — form that saves to Firebase messages collection

### Admin (protected by Supabase auth)
- Edit Hero, About, Projects, Skills
- Toggle featured project
- View and delete contact messages

### UI/UX
- Dark/Light mode — persisted to localStorage
- Custom cursor with ring follow effect
- Cursor spotlight — radial gradient follows mouse
- Fixed social sidebar (left) and email sidebar (right)
- Scroll fade-in animations on all sections
- Staggered card animations
- Scroll-to-top button
- Mobile hamburger menu
- 404 page

## Project Structure

```
Portfolio/
  client/               # React + Vite frontend
    public/
      Resume_RLT.pdf    # place resume here
    src/
      features/
        hero/
        about/
        projects/
        skills/
        contact/
        auth/
        admin/
        home/
      shared/
        api/            # axios instance
        components/     # Navbar, Footer, CustomCursor, SocialSidebar, EmailSidebar
        hooks/          # useTheme, useFadeIn, useSpotlight
        styles/         # tokens.css, global.css
  server/               # Node + Express backend
    src/
      features/
        hero/
        about/
        projects/       # includes featured project endpoint
        skills/
        contact/
      shared/
        config/         # firebase.js, supabase.js
        middleware/     # auth.js, errorHandler.js
    seed.js             # run once to populate Firebase
    index.js
```

## Known Gotchas

- [Firebase] Server 500 on first run → Firestore API disabled → Enable at console.developers.google.com
- [Supabase] Server crash on Node 20 → No native WebSocket → Install `ws` and pass as transport option
- [Theme] Login page white screen → data-theme not set before React renders → Set in main.jsx before createRoot
- [Firebase] Use `node seed.js` not `npm run seed` → no script registered
