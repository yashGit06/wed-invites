# 💍 Royal Indian Wedding Invitation Website

A luxury, interactive Indian wedding invitation web application crafted with **pure HTML5, CSS3, and modern Vanilla JavaScript**. Designed for seamless deployment on **GitHub Pages**, zero external build tooling required, and fully responsive across mobile, tablet, and desktop devices.

---

## ✨ Features at a Glance

- **🌺 Traditional Elegance & Sanskrit Shlokas:** Sacred invocations (*|| ॐ श्री गणेशाय नमः ||*, *|| मङ्गलम् भगवान् विष्णुः ||*, *शुभ विवाह*) typeset with Google Fonts `Noto Serif Devanagari` and `Rozha One`, paired with mandala motifs and warm gold accents.
- **⏳ Live Muhurat Countdown:** Real-time countdown timer tracking the exact ceremony hour (IST) with a direct "Add to Google Calendar" button.
- **📅 Interactive Celebrations Timeline:** Day-by-day event itinerary featuring ceremony times, venues, and instant Google Maps navigation links.
- **🗺️ Interactive 15 km Map & Directory:**
  - Powered by **Leaflet.js** and **OpenStreetMap**.
  - Dynamic 15 km radius boundary ring centered on the residence or venue.
  - Multi-category filter chips (**Stay**, **Food**, **Shopping**, **Tourist**, **Travel**, **House**).
  - Proximity clustering that fans out closely located places so all markers remain distinctly visible and clickable.
  - Live search bar and radius toggle (**Within 15 km** vs. **All Places**).
  - Synchronized guest directory table with "View on Map" focus and Google Maps directions.
- **🌸 Ambient Falling Petals:** Canvas-based flower petals gently floating across the screen, complete with a pause/resume toggle and accessibility controls (`prefers-reduced-motion`).
- **🎉 Confetti Celebration:** Interactive confetti burst button at the bottom right.
- **📱 Mobile-First Architecture:** Responsive navigation drawer, touch-friendly tap targets, and stacked layout cards.
- **🛡️ Zero Hardcoded Data in Code:** Code files (`index.html`, `app.js`, `js/*`) contain zero hardcoded personal names, dates, or data structures. Everything hydrates dynamically at runtime from [Data.json](file:///d:/Not%20JOB/Wedding%20Website%20JS/Data.json) and [dummyData.json](file:///d:/Not%20JOB/Wedding%20Website%20JS/dummyData.json).
- **📸 Extension-Agnostic Media:** Place images in `assets/images/` using any valid extension (`.jpg`, `.jpeg`, `.JPG`, `.png`, `.webp`, `.avif`)—the build and dev server resolve them automatically.

---

## 📁 Project Structure

```text
Wedding Website JS/
├── index.html                               # Assembled entry point (for GitHub Pages & browsers)
├── styles.css                               # Root CSS entrypoint (imports css/main.css)
├── app.js                                   # Bundled JavaScript entrypoint (bundled from js/*.js)
├── build.js                                 # Zero-dependency assembly & validation engine
├── server.js                                # Zero-dependency local dev server with extension-agnostic image resolution
├── package.json                             # Development scripts ("npm run dev", "npm run build")
├── Data.json                                # Primary data source (events, locations, family details)
├── dummyData.json                           # Fallback data source (schema-compliant fallback values for missing data)
├── README.md                                # Repository guide & documentation
│
├── assets/
│   └── images/                              # High-resolution wedding photography (any extension supported)
│       ├── Bride Single.JPG                 # Bride circular portrait
│       ├── Groom Single.jpeg                # Groom circular portrait
│       ├── Couple Pic landscape orientation.jpeg # Hero background photo
│       └── Couple Pic portrait orientation.jpg   # Editorial "Our Journey Begins" portrait photo
│
├── sections/                                # Modular HTML Section Partials:
│   ├── head.html                            # <head> metadata, Google Fonts, Leaflet CSS
│   ├── celebration-controls.html            # Petals canvas, confetti canvas, floating buttons
│   ├── header.html                          # Sticky top nav & brand monogram
│   ├── hero.html                            # Hero invitation cover, Sanskrit shlokas, dynamic couple names
│   ├── countdown.html                       # Live Muhurat countdown module
│   ├── couple.html                          # The Couple & Parents profile cards + editorial quote
│   ├── celebrations.html                    # Events itinerary timeline
│   ├── places.html                          # Places directory, Leaflet map, category filters & table
│   ├── rsvp.html                            # Closing auspicious blessings & RSVP card
│   └── footer.html                          # Site footer & modular scripts
│
├── css/                                     # Modular Luxury Stationery Stylesheets:
│   ├── main.css                             # Central aggregator importing all partials
│   ├── variables.css                        # Design tokens, color palette, typography, shadows
│   ├── reset.css                            # Reset & base typography, stationery paper texture
│   ├── stationery.css                       # Stationery frames, cards, buttons, mandalas, dividers
│   ├── navigation.css                       # Top navigation, brand monogram, mobile drawer
│   ├── hero.css                             # Hero section layout and typography
│   ├── countdown.css                        # Countdown grid & digit cards
│   ├── couple.css                           # Profile cards, family details, quote panel
│   ├── timeline.css                         # Day-by-day itinerary cards, badges, ceremony time
│   ├── places.css                           # Places directory, Leaflet map styling, directory table
│   ├── celebration.css                      # Canvas layers & floating controls
│   ├── rsvp-footer.css                      # Closing invitation & footer
│   ├── responsive.css                       # Mobile viewport polish & media queries (<= 768px)
│   └── accessibility.css                    # Reduced motion & focus ring states
│
└── js/                                      # Modular Vanilla JavaScript:
    ├── main.js                              # Application orchestrator & DOM ready bootstrapper
    ├── dataProcess.js                       # In-memory normalizer (populates window.processedData using dummyData.json)
    ├── data.js                              # Central state, dummyData.json & Data.json async loaders
    ├── utils.js                             # Haversine distance, dynamic date formatters, SVG icons
    ├── navigation.js                        # Header sticky scroll & mobile drawer interaction
    ├── couple.js                            # Dynamic couple & family profile rendering
    ├── timeline.js                          # Celebrations timeline rendering & calendar links
    ├── countdown.js                         # Live Muhurat countdown timer ticker
    ├── map.js                               # Leaflet map, 15 km radius circle, markers & clustering
    ├── directory.js                         # Places search, category filters, radius toggles & table
    ├── petals.js                            # Canvas falling flower petals simulation & toggle
    └── confetti.js                          # Canvas celebratory confetti burst engine
```

---

## ⚡ Development & Assembly Workflow

You can edit individual modular files in `sections/`, `css/`, or `js/`. When you are ready:

- **Reassemble `index.html` & Bundle `app.js`:**
  ```bash
  npm run build
  # or directly:
  node build.js
  ```
- **Run Local Development Server:**
  ```bash
  npm run dev
  ```
  Then open `http://localhost:3000` in your browser *(automatically redirects to `/index.html`)*.

> **Zero Dependencies:** Both `build.js` and `server.js` use Node's native built-in standard library—no `node_modules` installation required!

---

## 🔄 How the Data Architecture Works

1. **`Data.json` (Primary Source)**:
   Contains real wedding information (Groom, Bride, Events, Locations).
2. **`dummyData.json` (Fallback Source)**:
   Contains complete, generic dummy data conforming to the exact schema. If any field in `Data.json` is missing, empty, or unpopulated, values from `dummyData.json` are used automatically.
3. **`js/dataProcess.js` (In-Memory Processing)**:
   - Reads `Data.json` and `dummyData.json` at runtime via `fetch()`.
   - Produces the in-memory `window.processedData` variable.
   - **No files are generated on disk** (zero `processedData.json`).
   - Zero hardcoded names or dates inside JavaScript code files.
4. **Hydration**:
   Every visual component (`couple.js`, `timeline.js`, `countdown.js`, `map.js`, `directory.js`) reads dynamically from `window.processedData`.

---

## 🛠️ Personal Customization Guide

Customizing this invitation website for your own wedding takes only a few simple steps:

### 1. Update the Wedding Data (`Data.json`)

All couple details, event schedules, and map locations are dynamically driven by [Data.json](file:///d:/Not%20JOB/Wedding%20Website%20JS/Data.json).

#### A. Couple & Family Information
Edit the `"groom"` and `"bride"` objects:
```json
"groom": {
  "name": "MR. YOUR NAME",
  "relation": "Son of",
  "parents": {
    "father": "Shri Father's Name",
    "mother": "Smt. Mother's Name"
  }
},
"bride": {
  "name": "MS. HER NAME",
  "relation": "Daughter of",
  "parents": {
    "father": "Shri Father's Name",
    "mother": "Smt. Mother's Name"
  }
}
```

#### B. Event Timeline & Ceremonies
Edit the `"events"` array. Dates should follow the `YYYY-MM-DD` format:
```json
{
  "name": "WEDDING CEREMONY",
  "date": "2026-12-14",
  "day": "Monday",
  "time": "8:00 PM",
  "venue": "Verma Family Residence"
}
```
> **Tip:** The countdown timer in `js/countdown.js` automatically targets the event containing `"WEDDING CEREMONY"`.

#### C. Map Locations & Coordinates
Add or edit places in the `"locations"` array with their GPS latitude and longitude:
```json
{
  "name": "Royal Orchid Hotel",
  "category": "Stay",
  "coordinates": {
    "latitude": 23.352,
    "longitude": 85.322
  }
}
```
Available categories:
- `"House"` (Groom's Residence, Bride's Residence)
- `"Stay"` (Hotels, Guest Houses)
- `"Food"` (Restaurants, Sweets, Street Food)
- `"Shopping"` (Markets, Boutiques, Essentials)
- `"Tourist"` (Temples, Lakes, Waterfalls, Malls)
- `"Travel"` (Railway Station, Bus Stand, Airport)

---

### 2. Replacing Photos (Extension-Agnostic)

Place your photos in `assets/images/`. The application automatically resolves and serves them regardless of case or file extension (`.jpg`, `.jpeg`, `.JPG`, `.png`, `.webp`, `.avif`):

| Base Name | Location on Page | Recommended Aspect Ratio & Resolution |
| :--- | :--- | :--- |
| `Couple Pic landscape orientation` | Hero Section Background | **16:9 or 3:2** (e.g., 1920 × 1080 px) |
| `Bride Single` | The Couple Section (Bride Card) | **1:1 Square** (e.g., 800 × 800 px) |
| `Groom Single` | The Couple Section (Groom Card) | **1:1 Square** (e.g., 800 × 800 px) |
| `Couple Pic portrait orientation` | "Our Journey Begins" Editorial Card | **2:3 Vertical Portrait** (e.g., 1080 × 1620 px) |

After adding or renaming images, simply run:
```bash
npm run build
```

---

### 3. Customizing Colors & Styling (`css/variables.css`)

All colors, typography, and shadows are defined as CSS variables at the top of [css/variables.css](file:///d:/Not%20JOB/Wedding%20Website%20JS/css/variables.css) in the `:root` selector:

```css
:root {
  /* Royal Accent Colors */
  --color-royal-cobalt: #2273B3;        /* Highlights, active buttons, radius indicators */
  --color-champagne-gold: #B5A88B;      /* Mandala lines, frames, borders */
  --color-coral-rose: #F39E99;          /* Eyebrows, CTA gradients */
  --color-peach-blush: #FBE5E0;         /* Card backgrounds, subtle fills */
  --color-warm-ivory: #FFFDF9;          /* Page background */
  --color-dark-olive-grey: #3C423B;     /* Primary text color */
}
```

---

### 4. Customizing Text Quotes & Blessings (`sections/` or `index.html`)

You can personalize text directly in the modular section partials (and run `npm run build` or `node build.js`), or directly in [index.html](file:///d:/Not%20JOB/Wedding%20Website%20JS/index.html):

- **Sanskrit Shlokas:**
  - Invocations in the Hero section: [sections/hero.html](file:///d:/Not%20JOB/Wedding%20Website%20JS/sections/hero.html)
  - Auspicious Vishnu Shloka & *Shubh Vivah* blessings: [sections/rsvp.html](file:///d:/Not%20JOB/Wedding%20Website%20JS/sections/rsvp.html)
- **Love & Journey Quote:**
  - The romantic quote in the **"Bound by Love & Tradition"** editorial card: [sections/couple.html](file:///d:/Not%20JOB/Wedding%20Website%20JS/sections/couple.html)
- **Blessings & Closing Statement:**
  - Heartfelt wedding message and RSVP action buttons: [sections/rsvp.html](file:///d:/Not%20JOB/Wedding%20Website%20JS/sections/rsvp.html)

---

## 🚀 Running Locally

Because the application fetches [Data.json](file:///d:/Not%20JOB/Wedding%20Website%20JS/Data.json) and [dummyData.json](file:///d:/Not%20JOB/Wedding%20Website%20JS/dummyData.json) asynchronously via the `fetch` API, running a lightweight local HTTP server is recommended:

### Option A: Using Built-in Dev Server (Recommended)
```bash
npm run dev
```
Then open your browser at: `http://localhost:3000` *(automatically redirects to `/index.html`)*.
*(Zero external npm dependencies required—powered by Node's native HTTP library with automatic extension-agnostic image resolution).*

### Option B: Using Python
```bash
# In the project root directory:
python -m http.server 8080
```
Then open your browser at: `http://localhost:8080`

### Option C: VS Code Live Server
Right-click on `index.html` inside VS Code and select **"Open with Live Server"**.

### Option D: Using npx serve
```bash
npx serve .
```

---

## 🌐 Deploying to GitHub Pages

This repository is pre-configured for GitHub Pages without requiring any build step:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Personalize wedding invitation website"
   git push origin main
   ```
2. Navigate to your repository on GitHub.
3. Go to **Settings** > **Pages** (in the left sidebar).
4. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (or `master`) / `/ (root)`
5. Click **Save**. Within 1–2 minutes, your website will be live at:
   ```text
   https://<your-username>.github.io/<your-repo-name>/
   ```

All asset references in `index.html`, `styles.css`, and `app.js` use explicit relative `./` paths, ensuring error-free loading on both custom domains and GitHub repository subpaths.

---

## 📜 Libraries & CDN Credits

- **Interactive Maps:** [Leaflet.js](https://leafletjs.com/) (v1.9.4) & [OpenStreetMap](https://www.openstreetmap.org/)
- **Typography:** [Google Fonts](https://fonts.google.com/) (`Playfair Display`, `Cormorant Garamond`, `Cinzel Decorative`, `Noto Serif Devanagari`, `Rozha One`, `Plus Jakarta Sans`)
- **Icons:** Inline SVG icons (zero external icon font dependency)

---

Wishing you a joyful and auspicious wedding celebration! 🌸✨
