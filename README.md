# YNM Mega Industries — Corporate Website

Corporate website for **YNM Mega Industries Pvt Ltd**, a manufacturer and exporter of paints, metal fabrications, and school furniture. The site showcases products, clients, team, careers, contact, an AI chatbot, and an interactive India presence map.

---

## Project Summary

| | |
|---|---|
| **Company** | YNM Mega Industries Pvt Ltd |
| **Established** | 2013 |
| **Tagline** | Manufacturing & Export Excellence Since 2013 |
| **Purpose** | Public site for brand, products, clients, team, careers, contact, and support |

**Main capabilities:**
- Browse products by category (Paints, Metal Fabrication, School Furniture) with detail pages  
- View client/partner logos and testimonials  
- Employee testimonials and team info  
- Contact form → saved to **Google Sheets**  
- Career applications with **PDF resume upload** → email to HR (Nodemailer / Gmail / SendGrid)  
- **AI chatbot** (Google Gemini) for company/product questions in English or Hindi  
- **Multilingual UI** (English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Urdu) with first-time language modal  
- **Interactive India presence map** with state-wise contacts on the Contact page  
- Foreign collaborations, investor relations, privacy policy, and terms of use  

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (React 19) |
| **Styling** | Tailwind CSS, global CSS (`styles/globals.css`) |
| **Fonts** | Montserrat (variable, self-hosted in `public/fonts/`) |
| **Contact form** | Google Sheets API (`googleapis`) |
| **Careers form** | Formidable (multipart), **pdf-parse** (resume validation), **Nodemailer** |
| **Chatbot** | Google Gemini API (`GOOGLE_GEMINI_API_KEY`) |
| **Email (Careers)** | Nodemailer — SMTP, Gmail, or SendGrid |

### Dependencies (production)

- `next` 15.0.7  
- `react` 19, `react-dom` 19  
- `formidable` — multipart form parsing (resume upload)  
- `googleapis` — Google Sheets for contact submissions  
- `nodemailer` — career application emails  
- `pdf-parse` — PDF validation (e.g. password-protected check)  

### Dev dependencies

- `tailwindcss`, `postcss`, `eslint`, `eslint-config-next`  

**Node:** 20.x (see `package.json` `engines`)

---

## Project Structure

The app lives in the **`site/`** directory. All commands below assume you are in `site/`.

```
YNM website/
├── site/                          # Application root
│   ├── components/                # React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── USPSection.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── BrandsSection.jsx
│   │   ├── EmployeesSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── IndiaPresenceMap.jsx   # Contact page: state-wise India map
│   │   ├── LanguageSelector.jsx
│   │   ├── FirstTimeLanguageModal.jsx
│   │   ├── Chatbot.jsx            # AI chatbot (Gemini)
│   │   ├── Mascot.jsx             # Floating mascot with facts
│   │   └── FloatingSocialMedia.jsx
│   ├── contexts/
│   │   └── LanguageContext.jsx    # EN/Hi + 10 more languages, localStorage
│   ├── lib/
│   │   ├── translations.js        # All UI strings (nav, hero, footer, etc.)
│   │   ├── employeesData.js       # Employee testimonials + photo paths
│   │   ├── chatbotData.js         # FAQs, product catalog, contact links for chatbot
│   │   ├── indiaContacts.js       # State-wise contact entries for India map
│   │   └── indiaMapPaths.js       # SVG path data for India map
│   ├── pages/
│   │   ├── _app.js                # LanguageProvider, FirstTimeLanguageModal, Mascot, Chatbot, FloatingSocialMedia
│   │   ├── _document.js
│   │   ├── _error.js, 404.js
│   │   ├── index.js               # Home
│   │   ├── about/, careers/, clients/, contact/
│   │   ├── foreign-collaborations/, investor-relations/, our-team/
│   │   ├── privacy/, terms/
│   │   ├── products/index.jsx     # Product catalog
│   │   ├── products/[productId].jsx
│   │   └── api/
│   │       ├── contact/submit.js  # → Google Sheets
│   │       ├── careers/submit.js  # multipart + PDF → Nodemailer
│   │       └── chat/gemini.js     # → Google Gemini
│   ├── public/
│   │   ├── assets/                # brand-logos, employeephotos, product-*, gallery-*, hero, mascot, logos, team-member-*
│   │   ├── fonts/Montserrat[wght].ttf
│   │   ├── favicon.ico, robots.txt, sitemap.xml
│   ├── styles/globals.css
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   ├── postcss.config.mjs
│   ├── jsconfig.json              # Path alias: @/* → ./*
│   └── package.json
├── .gitignore
└── README.md
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home: Hero, USPs, products, brands, employees, testimonials |
| `/about` | About, gallery (facility, production, warehouse) |
| `/products` | Product catalog: Paints, Metal Fabrication, School Furniture |
| `/products/[productId]` | Product detail (e.g. `p1`, `f1`, `s1`) |
| `/clients` | Client/partner logos and testimonials |
| `/our-team` | Employee testimonials and team |
| `/careers` | Job listings and application form (resume PDF upload) |
| `/contact` | Contact form and **India presence map** (state-wise contacts) |
| `/foreign-collaborations` | International partnerships by region |
| `/investor-relations` | Investor information |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/404` | Custom 404 |

---

## API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/contact/submit` | POST | Contact form → **Google Sheets** (Sheets API). Body: `name`, `email`, `phone`, `company`, `subject`, `message`. |
| `/api/careers/submit` | POST | **Multipart**: `name`, `email`, `phone`, `position`, `experience`, `coverLetter`, `resume` (PDF), `captchaAnswer`, `captchaQuestion`, `recaptchaToken`. Validates PDF (type, size ≤5MB, no password), rate limit (3/15 min per IP), reCAPTCHA. Sends confirmation to applicant and HR notification with resume attachment via **Nodemailer** (SMTP / Gmail / SendGrid). |
| `/api/chat/gemini` | POST | Body: `{ message, conversationHistory?, language?: "en" \| "hi" }`. Uses **Google Gemini** (tries `gemini-2.5-flash`, `gemini-2.0-flash`, etc.) with company context. Returns `{ response }`. |

---

## Environment Variables

Create **`site/.env.local`** and set the variables used by the features you enable.

### Contact form (Google Sheets)

- `GOOGLE_SHEET_ID` — ID of the Google Sheet  
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — Service account email  
- `GOOGLE_PRIVATE_KEY` — Service account private key (use `\n` for newlines in env)  

### Chatbot (Gemini)

- `GOOGLE_GEMINI_API_KEY` — Gemini API key  

### Careers (email)

**One of:**

- **SMTP:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`; optionally `SMTP_SECURE`, `SMTP_REJECT_UNAUTHORIZED`  
- **Gmail:** `GMAIL_USER`, `GMAIL_APP_PASSWORD`  
- **SendGrid:** `SENDGRID_API_KEY`  

**Optional:**

- `HR_EMAIL` — Where to send applications (default: `hr@ynmsafety.com`)  
- `CAREERS_NOREPLY_FROM` — “From” address for automated emails  
- `RECAPTCHA_SECRET_KEY` — reCAPTCHA v2/v3 secret (test key used when unset)  

---

## How to Run

### 1. Install

```bash
cd site
npm install
```

### 2. Environment

Create `site/.env.local` with the variables above for Contact, Chat, and Careers as needed.

### 3. Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server → [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Production build |
| `npm start` | Run production server (after `npm run build`) |
| `npm run lint` | Run ESLint |

---

## Styling & Theming

- **Tailwind** in `tailwind.config.js`: custom colors (`primary`, `secondary`, `accent`, `dark`, `light`, `muted`), `fontFamily.brand`, `boxShadow.premium`.  
- **`styles/globals.css`**:  
  - `@font-face` for Montserrat (variable).  
  - CSS variables: `--deep-maroon`, `--rich-wine`, `--antique-gold`, `--warm-champagne`, `--soft-ivory`, and derived/section gradients.  
  - Global resets, scroll behavior, and animations (hero, services, etc.).  

---

## Data & Content

- **`lib/translations.js`** — `LANGUAGES` and `translations` for 12 languages; `en` and `hi` have full copy; others can use `en` as fallback. Used for nav, hero, footer, FirstTimeLanguageModal, etc.  
- **`lib/employeesData.js`** — Employee name, role, department, quote, photo path (`/assets/employeephotos/...`).  
- **`lib/chatbotData.js`** — `faqData`, `productCatalog` (paints, fabrication, furniture), `contactLinks`.  
- **`lib/indiaContacts.js`** — State code → `{ stateName, contacts: [{ name, role, phone, email }] }` for the India map.  
- **`lib/indiaMapPaths.js`** — SVG path data for Indian states (used by `IndiaPresenceMap`).  

Product catalog is also defined in `pages/products/index.jsx` (categories and product details with `id`, `name`, `desc`, `image`, `specs`).

---

## Assets (`site/public/`)

- **`assets/brand-logos/`** — Client/partner logos (Home, Clients).  
- **`assets/employeephotos/`** — Employee photos.  
- **`assets/`** — `product-*.png`, `gallery-*.jpg`, `hero-image.png`, `mascot.png`, `logo-navbar.jpg`, `logo-footer.jpg`, `team-member-01.png`–`team-member-10.png` (fallbacks).  
- **`fonts/Montserrat[wght].ttf`** — Primary font.  
- **`favicon.ico`**, **`robots.txt`**, **`sitemap.xml`**.  

`next.config.mjs` uses `images.unoptimized: true`; no Image Optimization API is required.

---

## Deployment

- **`npm run build`** must be run from `site/`.  
- Needs a **Node.js server** (e.g. Vercel, VPS, PaaS). API routes do **not** work with a purely static export.  
- **Vercel:** set the project **Root Directory** to `site`.  
- Configure the same env vars in your host’s environment.  

---

## Feature Overview

| Feature | Where | Notes |
|---------|-------|-------|
| Multilingual (12 languages) | Global | `LanguageContext`, `translations.js`, `FirstTimeLanguageModal` |
| AI chatbot | Global (floating) | Gemini; `chatbotData.js` for products/FAQs; `language` for EN/Hi |
| Mascot | Global (floating) | Rotating facts, minimizable |
| Contact form | `/contact` | Saves to Google Sheets |
| India map | `/contact` | `IndiaPresenceMap`, `indiaContacts`, `indiaMapPaths` |
| Careers form | `/careers` | Resume PDF upload, rate limit, reCAPTCHA, math CAPTCHA, confirmation + HR emails |
| Employee section | `/`, `/our-team` | `EmployeesSection` + `employeesData.js` |
| Client logos & testimonials | `/`, `/clients` | `BrandsSection` and Clients page |
| Product catalog | `/`, `/products`, `/products/[id]` | Categories: Paints, Fabrication, Furniture |

---

## Path Aliases

- **`@/*`** → `./*` (via `jsconfig.json`).  
- Imports use e.g. `@/components/...`, `@/lib/...`, `@/contexts/...`, `@/styles/...`.

---

## License & Ownership

Proprietary to **YNM Mega Industries Pvt Ltd**. All rights reserved.
