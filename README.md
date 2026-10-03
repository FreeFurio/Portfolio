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

## Features

### Public
- **Hero** — name, title, tagline, CTA buttons, resume download
- **About** — bio, photo, stats
- **Projects** — featured project card + grid, tech stack, GitHub/live links
- **Skills** — grouped skill pills
- **Contact** — form that saves to Firebase

### Admin (protected by Supabase auth)
- Edit Hero, About, Projects, Skills
- Toggle featured project
- View and delete contact messages

### UI/UX
- Dark/Light mode — persisted to localStorage
- Cinematic page loader
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
        components/     # Navbar, Footer, CustomCursor, SocialSidebar, EmailSidebar, PageLoader
        hooks/          # useTheme, useFadeIn, useSpotlight
        styles/         # tokens.css, global.css
  server/               # Node + Express backend
    src/
      features/
        hero/
        about/
        projects/
        skills/
        contact/
      shared/
        config/         # firebase.js, supabase.js
        middleware/     # auth.js, errorHandler.js
    seed.js
    index.js
```
