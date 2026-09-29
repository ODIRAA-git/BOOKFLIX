# Bookflix

A Netflix-style book discovery app. Browse novels by genre in auto-scrolling rows, read a prologue before you commit, and save favourites to a personal wishlist that syncs to your account.

**Live demo: [bookfliix.netlify.app](https://bookfliix.netlify.app/)**

> **Try it without signing up:** click **Try the demo account** on the homepage, or sign in with `demo@bookflix.com` / `book023`.

## Features

- **Landing page**: a marketing page for visitors, with email sign-up, a genre showcase and FAQ; the library itself is only available once you're signed in
- **Protected routes**: `/` is the landing page and `/browse` is the library, guarded by React Router based on the Supabase session
- **Genre rows**: Fantasy, Fiction, Romance, Mystery & Thriller, Horror, Poetry, plus a Recommended row, shown as continuously scrolling carousels
- **Book details**: cover, rating and prologue in a modal
- **Book pages**: "Start Reading" opens `/book/:slug`, a reading view with the prologue, an end-of-preview notice and more books from the same genre
- **Authentication**: email/password sign-up and login via Supabase Auth, with a one-click guest login
- **Wishlist**: add and remove books; stored per user in a Supabase Postgres table
- **Genre search**: search from the navbar, which jumps to and highlights the matching row
- **Dark/light mode**: theme choice is remembered between visits
- **Responsive layout**: works on desktop and mobile

## Tech stack

| Area      | Choice                                   |
| --------- | ---------------------------------------- |
| UI        | React 19, TypeScript, React Router       |
| Build     | Vite                                     |
| Backend   | Supabase (Auth + Postgres)               |
| Styling   | Plain CSS with light/dark theme classes  |
| Hosting   | Netlify (SPA redirects in `public/_redirects`) |

## Project structure

```
src/
├── main.tsx                 # App entry point
├── App.tsx                  # Routes: / (landing), /browse and /book/:slug (signed-in only)
├── pages/
│   ├── LandingPage.tsx      # Marketing page for signed-out visitors
│   ├── BrowsePage.tsx       # The library: genre rows, book details, wishlist
│   └── BookPage.tsx         # Reading view for a single book
├── context/                 # AuthContext + AuthProvider (shared session state)
├── components/
│   ├── routing/             # ProtectedRoute, PublicOnlyRoute
│   ├── common/              # Modal, SplashScreen
│   ├── landing/             # Landing page sections (hero, features, genres, FAQ…)
│   ├── layout/              # Navbar, Footer
│   ├── browse/              # HeroSection, BookRow, BookCard
│   ├── auth/                # LoginModal, SignupModal
│   ├── books/               # BookDetailsModal
│   ├── reader/              # Book page sections (end-of-preview notice, more in genre)
│   └── profile/             # ProfileModal (user info + wishlist)
├── hooks/
│   ├── useAuth.ts           # Access to the shared auth context
│   ├── useWishlist.ts       # Wishlist fetch, add, remove (Supabase)
│   └── useTheme.ts          # Dark/light mode with persistence
├── data/books.ts            # Book catalogue and genre rows
├── lib/                     # Supabase client, demo account details
├── types/book.ts            # Shared TypeScript types
├── styles/                  # Global, library, landing and reader styles
└── assets/                  # Book covers, grouped by genre
```

## Getting started

Requires Node.js 20+.

```bash
git clone https://github.com/ODIRAA-git/BOOKFLIX.git
cd BOOKFLIX
npm install
npm run dev
```

Then open http://localhost:5173.

### Scripts

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload  |
| `npm run build`   | Type-check and build for production   |
| `npm run preview` | Serve the production build locally    |
| `npm run lint`    | Run ESLint                            |

## Database

Wishlists are stored in a `wishlists` table in Supabase, with one row per saved book: `user_id`, `book_title`, `book_image`, `book_prologue` and `book_rating`.
