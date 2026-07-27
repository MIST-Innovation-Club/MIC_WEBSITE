# MIST Innovation Club — Website

A multi-page React 19 site for MIC with an admin dashboard backed by Firebase
(Auth, Firestore, Storage, Hosting). Built with Vite, Tailwind CSS, React
Router, Framer Motion, Lucide icons, and Swiper.

Every page currently renders **placeholder/dummy content** (events, gallery
images, people, news, logo) wherever real content hasn't been added yet.
Add real content through `/admin` and the placeholders disappear on their
own — nothing needs to be edited in code.

## 1. Firebase project setup

1. Go to the [Firebase Console](https://console.firebase.google.com) and open your existing project (or create one).
2. **Add a Web App**: Project Settings → General → "Your apps" → Web (`</>`) icon. Copy the config values shown — you'll need them for step 3.
3. **Enable Authentication**: Build → Authentication → Get started → enable the **Email/Password** provider.
4. **Enable Firestore**: Build → Firestore Database → Create database → start in production mode, pick a region.
5. **Enable Storage**: Build → Storage → Get started.
6. **Create your first admin user**:
   - Authentication → Users → Add user → enter an email + password for yourself.
   - Copy that user's **UID**.
   - Firestore Database → Start collection → collection ID `admins` → Document ID = the UID you copied → add any field, e.g. `role: "admin"` → Save.
   - This is what grants dashboard access — see `firestore.rules`. To add more admins later, repeat this step for their UID.

## 2. Local setup

```bash
npm install
cp .env.example .env
```

Fill in `.env` with the values from step 1.2:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`. Sign in at `/login` with the admin account you created, then visit `/admin`.

## 3. Deploy security rules

Install the Firebase CLI once if you don't have it: `npm install -g firebase-tools`.

```bash
firebase login
```

Edit `.firebaserc` and replace `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` with your actual Firebase project ID (found in Project Settings).

```bash
firebase deploy --only firestore:rules,storage
```

This makes public read / admin-only write rules live (see `firestore.rules` and `storage.rules`). **Do this before going live** — without it, Firestore/Storage stay in whatever default mode you picked when creating them.

## 4. Deploy the site to Firebase Hosting

```bash
firebase init hosting   # only if this project wasn't already set up for Hosting; point it at the "dist" folder, choose "Yes" for single-page app rewrite
npm run build
firebase deploy --only hosting
```

Or use the shortcut once everything's configured: `npm run deploy`.

## Content model (Firestore collections)

| Collection | Fields |
|---|---|
| `events` | `title, description, date, time, location, category, imageUrl, createdAt` |
| `gallery` | `imageUrl, caption, category, createdAt` |
| `people` | `name, role, category, bio, imageUrl, order, createdAt` |
| `news` | `title, summary, date, link, createdAt` |
| `admins` | doc ID = user UID, marks that user as a dashboard admin |

All of these are editable from `/admin` — you shouldn't need to touch Firestore directly after initial setup, except to add/remove admins.

## Project structure

```
src/
  components/    shared UI (Navbar, Footer, ImageUploader, etc.)
  context/       AuthContext (Firebase Auth + admin check)
  hooks/         useCollection — realtime Firestore hook
  data/          dummy.js — placeholder/fallback content
  pages/         Home, Events, EventDetail, Gallery, People, Login
  pages/admin/   AdminLayout, Dashboard, Manage{Events,Gallery,People,News}
```

## Design notes

The theme is a deep-navy "circuit board" aesthetic that extends the existing
club logo (the gear-and-lightbulb head on a neural-net background): ink-navy
surfaces, a signal-blue brand color, and a copper/amber accent used sparingly
for the "live circuit trace" motif that runs down the homepage. Section
labels are styled like PCB module tags (`MODULE — ABOUT`), Space Grotesk is
used for display type, Inter for body copy, and JetBrains Mono for
labels/data. Swap the accent colors in `tailwind.config.js` if you'd like a
different palette — everything reads from those tokens.

## Things you'll likely want to replace

- `public/favicon.svg` — swap for the real MIC logo.
- Hero copy in `src/pages/Home.jsx` — written as placeholder copy, matched to the reference tone.
- Social links in `src/components/Footer.jsx` (currently `href="#"`).
- Contact email / address in the footer.
