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
6. **Create your admin user(s)**:
   - Authentication → Users → Add user → enter an email + password.
   - That's it — there's no public sign-up page, so **anyone who can sign in at `/login` is automatically treated as an admin**. To add another exec, just add another user here with their email; to revoke access, delete or disable their user.

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

### Option A — automatic deploys via GitHub Actions (recommended, already set up)

This repo includes `.github/workflows/firebase-hosting.yml`, which builds and deploys to Firebase Hosting automatically on every push to `main`. You just need to give it two things as **GitHub repo secrets** (Settings → Secrets and variables → Actions → New repository secret):

**1. Your Firebase client config**, one secret per value from step 1.2 (same values as your local `.env`):
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```
These are safe to store as Actions secrets even though they end up in the built JS bundle — Firebase client config isn't a secret credential; it's protected by the security rules already in this repo, not by hiding it.

**2. A Firebase service account**, so the Action is allowed to deploy on your behalf:
- Firebase Console → your project → ⚙️ **Project Settings** → **Service accounts** tab → **Generate new private key** → confirm. This downloads a `.json` file — keep it private, don't commit it to the repo.
- Open that file, copy its **entire contents**.
- GitHub repo → Settings → Secrets and variables → Actions → New repository secret → name it exactly `FIREBASE_SERVICE_ACCOUNT` → paste the whole JSON as the value.

(If you instead run `firebase init hosting:github` from the CLI, it creates a secret with a different auto-generated name like `FIREBASE_SERVICE_ACCOUNT_<PROJECT_ID>` — either rename that secret to `FIREBASE_SERVICE_ACCOUNT`, or update the `firebaseServiceAccount:` line in `.github/workflows/firebase-hosting.yml` to match whatever name it picked. The manual steps above avoid that mismatch entirely.)

Once both are set, just `git push` to `main` and the Actions tab will show the build + deploy running automatically — no manual `firebase deploy` needed going forward.

**If you were previously using a GitHub Pages workflow** (a file like `.github/workflows/static.yml` with `actions/deploy-pages`), delete that file — otherwise both workflows will run on every push and you'll have two different (and differently broken) versions of the site live at two different URLs. Also go to Settings → Pages and set Source to "None" to fully turn Pages off.

### Option B — manual deploy from your machine

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

All of these are editable from `/admin` — you shouldn't need to touch Firestore directly after initial setup. Admin access itself is managed entirely in Firebase Authentication (Users tab), not Firestore.

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
