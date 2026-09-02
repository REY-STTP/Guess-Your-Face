# ✨ Guess Your Face (GYF)

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![i18n](https://img.shields.io/badge/i18n-ID%20%7C%20EN-8b5cf6?style=for-the-badge)
![Face++](https://img.shields.io/badge/AI_Engine-Face%2B%2B_v3-ff6b00?style=for-the-badge)

<br />

**Real-Time AI-Powered Facial Detection, Comparison, and Attribute Analysis Playground.**

*"Guess your face, let AI do the reading."*

[Key Features](#-key-features) • [Evolution & Upgrades](#-evolution--upgrades-from-previous-version) • [Architecture](#-architecture--workflow) • [Installation](#-installation--local-setup) • [API Routes](#-internal-api-endpoints) • [SEO / GEO / AEO / LLMO](#-seo--geo--aeo--llmo-setup)

</div>

---

## 📌 About The Project

**Guess Your Face** is a modern web application powered by artificial intelligence (Face++ Cognitive Services API) to detect micro-expressions, analyze demographic & aesthetic facial profiles, verify similarity between two photos (1:1 face matching), and deeply inspect face tokens.

All image processing is performed **real-time *in-memory*** through secure Next.js Route Handlers, without storing user images on the server or database (Zero Data Retention / Privacy-First).

---

## 🚀 Evolution & Upgrades from Previous Version

> This project is an **evolution, complete architectural revamp (v2.0), and significant upgrade** from the original repository:  
> 🔗 **[REY-STTP/Facial-Expression-Detection-App](https://github.com/REY-STTP/Facial-Expression-Detection-App)**

### 📊 Version Comparison:

| Aspect / Feature | Previous Version (`v1.0`) 🏛️ | Guess Your Face (`v2.0` - Current) ⚡ |
| :--- | :--- | :--- |
| **Architecture & Tech Stack** | Monolithic Node.js + Express.js + Multer + MongoDB | Modern Full-Stack **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4** |
| **Storage & Privacy** | Requires database (MongoDB) for auth/data | **Zero-Storage Privacy-First**: images processed *in-memory* & never stored |
| **Localization (i18n)** | Hardcoded single language | **Built-in ID/EN Bilingual System**: client-side instant toggle, automatic browser detection, and `localStorage` persistence |
| **Detection Features** | Basic emotion detection with simple text labels | **Multi-Face Detection**: 7 percentage-weighted emotions, age estimation, gender, *smiling score*, *beauty score* (male & female), *face quality*, & 3D *headpose* angles |
| **Comparison Feature (Compare)** | ❌ Not available | ✅ **1:1 Face Verification** with *confidence score* visualization & Face++ *threshold* benchmarks (1e-3, 1e-4, 1e-5) |
| **Token Analysis Feature (Analyze)** | ❌ Not available | ✅ **Deep Batch Inspector** for up to 5 *face tokens* with dynamic filters (including glasses, eye status, & medical mask) |
| **Image Interactivity** | Standard image upload without preprocessing | **Built-in Interactive Canvas Cropper** with *drag/pan* navigation and *zoom slider* |
| **Results Visualization** | Raw / simple text responses | **Interactive Bounding Boxes** on faces, *color-coded animated progress bars*, & modern metric cards |
| **Design & UI/UX** | Minimalist view | Premium interface with *modern brutalist/minimalist* aesthetics, adaptive **Dark & Light Theme** support, **WCAG AA compliant contrast ($\ge$ 4.5:1)**, robust typography hierarchy (*Inter Variable, Space Grotesk & JetBrains Mono*), and interactive notifications via **Sonner** |

---

## 🎯 Key Features

### 1. 🔍 Detect Tool (`/detect`)
* **Multi-Face Detection**: Detects all faces in a single photo simultaneously.
* **Interactive Bounding Boxes**: Highlights face positions on the image with index numbers synchronized with the result cards.
* **7 Emotion Spectra**: Percentage-based visualization of emotions (*Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise*) with animated progress bars.
* **Comprehensive Metrics**:
  * 👤 **Gender & Age**: Gender prediction and age estimation.
  * 😊 **Smiling Rate**: Smile intensity level (0–100%).
  * ✨ **Beauty Score**: Aesthetic facial scores (average, male perception, and female perception scores).
  * 📐 **3D Headpose**: Head tilt and orientation angles (*Pitch, Roll, Yaw*).
  * 🛡️ **Face Quality**: Clarity and suitability score of facial quality.
* **Auto-Token Handoff**: Face tokens (*face_token*) are automatically saved to `sessionStorage` and clipboard for instant inspection in the *Analyze* tool.

### 2. ⚖️ Compare Tool (`/compare`)
* **1:1 Face Matching**: Compares two photos to determine whether they belong to the same individual.
* **Dual Independent Cropper**: Enables independent cropping and previews for Photo 1 and Photo 2.
* **Confidence Meter**: Calculates matching confidence percentage along with official Face++ error tolerance thresholds (*1e-3, 1e-4, 1e-5*).
* **Visual Indicators**: Provides instant conclusions (*High Match / Same Person / Different Person*).

### 3. 🧬 Analyze Tool (`/analyze`)
* **Face Token Deep Inspector**: Deep attribute analysis for 1 up to 5 *face tokens* simultaneously.
* **Custom Attribute Filters**: Modularly select attributes to fetch:
  * Gender & Age
  * Emotion & Smiling Rate
  * Face Quality & Beauty Score
  * 😷 **Mouth Status**: Detects surgical/medical mask wearing, open mouth, or object occlusion.
  * 👓 **Eye Status**: Detects open/closed eyes, normal glasses, sunglasses, or occlusions.

### 4. 🌐 Bilingual Localization (i18n)
* Full support for **Indonesian (ID)** and **English (EN)** with instant reactivity, persistent storage, and automatic language detection based on the user's browser preferences.

### 5. ✂️ Built-in In-Browser Canvas Cropper
* Users can adjust facial positions, pan/drag, and zoom photos before submitting to the API, ensuring optimal resolution and file size within the 2 MB limit.

---

## 🛠️ Tech Stack & Dependencies

* **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Native CSS Variables
* **Typography**: `@fontsource-variable/inter` (Body), `@fontsource-variable/space-grotesk` (Display/Headings), & `@fontsource-variable/jetbrains-mono` (Code/Data)
* **Icons**: [Phosphor Icons (`@phosphor-icons/react`)](https://phosphoricons.com/)
* **Toaster / Notification**: [Sonner](https://sonner.emilkowal.ski/)
* **AI Cognitive Engine**: [Face++ Cognitive Services API (US Region v3)](https://www.faceplusplus.com/)

---

## 🏗️ Architecture & Workflow

```mermaid
flowchart TD
    A["User Selects Photo"] --> B["Interactive Canvas Cropper"]
    B --> C["Next.js Client Component"]
    C -->|"FormData POST"| D["Next.js Route Handlers (/api/*)"]
    
    subgraph Server_Boundary ["Server-Side Next.js (Secure)"]
        D --> E["File Validation & Size < 2MB"]
        E --> F["Inject API Key & Secret"]
        F -->|"Fetch HTTPS"| G["Face++ Cloud API US v3"]
        G -->|"Response JSON"| H["Friendly Error Mapping & Sanitizer"]
    end
    
    H -->|"JSON Result"| C
    C --> I["Interactive FacePreview & Metric Visualization"]
    C -.->|"Save Token"| J["SessionStorage & Clipboard"]
    J -.->|"Auto-fill"| K["Analyze Tool (/analyze)"]
```

---

## 📁 Directory Structure

```text
guess-your-face/
├── app/
│   ├── (tools)/
│   │   ├── analyze/page.tsx      # Analyze Tool Page
│   │   ├── compare/page.tsx      # Compare Tool Page
│   │   ├── detect/page.tsx       # Detect Tool Page
│   │   └── layout.tsx            # Sub-layout for tools pages
│   ├── api/
│   │   ├── analyze/route.ts      # API Route Handler for Face++ Analyze
│   │   ├── compare/route.ts      # API Route Handler for Face++ Compare
│   │   └── detect/route.ts       # API Route Handler for Face++ Detect
│   ├── globals.css               # Global styles, color tokens, & animations
│   ├── layout.tsx                # Root layout, Toaster & LanguageProvider
│   ├── not-found.tsx             # Custom 404 Page
│   └── page.tsx                  # Landing page & Navigation menu
├── components/
│   ├── AnalyzeTool.tsx           # Analyze feature controller component
│   ├── CompareTool.tsx           # Compare feature controller component
│   ├── CropModal.tsx             # Interactive canvas cropper modal (pan & zoom)
│   ├── DetectTool.tsx            # Detect feature controller component
│   ├── EmotionBars.tsx           # Animated emotion progress bar visualization
│   ├── FacePreview.tsx           # Image preview with responsive Bounding Boxes
│   ├── LanguageSwitcher.tsx      # Bilingual ID/EN segmented toggle switch
│   ├── SiteFooter.tsx            # Localized privacy & attribution footer
│   ├── SiteHeader.tsx            # Application header with logo & switcher
│   ├── ToolMenu.tsx              # Feature cards on landing page
│   ├── ToolNav.tsx               # Navigation tab bar across tools
│   └── ui.tsx                    # Reusable UI primitives (Buttons, Dropzone, etc.)
├── lib/
│   ├── emotions.ts               # Emotion metadata, color themes, emoji, & helpers
│   ├── facepp.ts                 # Face++ API client, error mapping, & validator
│   ├── i18n/                     # Internationalization core
│   │   ├── context.tsx           # Language React Context & useLanguage hook
│   │   ├── types.ts              # Type-safe schema definition for dictionaries
│   │   └── dictionaries/         # ID and EN language dictionary files
│   │       ├── en.ts
│   │       └── id.ts
│   └── use-image-upload.tsx      # Custom React Hook for upload & crop lifecycle
├── public/                       # Static assets & logos
├── .env.example                  # Environment variables template
└── package.json                  # Dependencies & scripts configuration
```

---

## 💻 Installation & Local Setup

### Prerequisites:
* [Node.js](https://nodejs.org/) version 18.18+ or 20+
* Account and API Credentials from [Face++ (Megvii)](https://www.faceplusplus.com/)

### Step 1: Clone Repository
```bash
git clone https://github.com/REY-STTP/guess-your-face.git
cd guess-your-face
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Face++ credentials:
```env
# Face++ API credentials — https://www.faceplusplus.com/
FACEPP_API_KEY=your_faceplusplus_api_key_here
FACEPP_API_SECRET=your_faceplusplus_api_secret_here
```

### Step 4: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Build for Production
```bash
npm run build
npm run start
```

---

## 🔌 Internal API Endpoints

This application provides internal Next.js Route Handlers that isolate API credentials from the client side:

| Endpoint | Method | Input Body | Description |
| :--- | :--- | :--- | :--- |
| `/api/detect` | `POST` | `multipart/form-data` (`file`) | Sends image to Face++ `/detect` and returns detected faces with all extracted attributes. |
| `/api/compare` | `POST` | `multipart/form-data` (`file1`, `file2`) | Compares 2 facial photos and returns matching *confidence* score along with *thresholds*. |
| `/api/analyze` | `POST` | `application/json` (`{ faceTokens, attributes }`) | Fetches deep attributes for an array of registered *face tokens*. |

---

## 🔒 Privacy & Security

1. **Zero Data Retention**: Uploaded images are processed directly in memory (*buffer/stream*) and forwarded to the Face++ API. No images are saved to local disk, servers, or databases.
2. **Protected Credentials**: API keys (`FACEPP_API_KEY` and `FACEPP_API_SECRET`) are accessed exclusively on the server (*server-side route handlers*) and never exposed to the client bundle.
3. **Strict File Validation**: Validates MIME types (`image/jpeg`, `image/png`) and enforces a maximum file size limit of 2 MB before dispatching requests to the external API.

---

## 👤 Author & License

Created with ❤️ by **[REY-STTP](https://github.com/REY-STTP)**.

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🔍 SEO / GEO / AEO / LLMO Setup

This project ships with first-class discoverability built in: technical SEO, structured data, Open Graph cards, AI-crawler friendly routing, and an `llms.txt` description file.

### Canonical Domain

The production domain is **`https://www.guess-your-face.web.id`**. A [`proxy.ts`](./proxy.ts) at the repo root (Next.js 16's replacement for `middleware.ts`, runs on the Node.js runtime) forces a **308 Permanent Redirect** to the canonical host from any other origin (preview URLs, the legacy Vercel domain `guess-your-expression.vercel.app`, or the apex without `www`). The proxy is a no-op in development so `localhost:3000` keeps working.

### Files That Power Discoverability

| Concern | File | Purpose |
| :--- | :--- | :--- |
| Crawler policy | [`app/robots.ts`](./app/robots.ts) | Generates `/robots.txt` allowing all major crawlers plus 12 AI bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Bytespider`, `Amazonbot`, `Applebot-Extended`, `cohere-ai`, `Diffbot`, `FacebookBot`, `Meta-ExternalAgent`). |
| Sitemap | [`app/sitemap.ts`](./app/sitemap.ts) | Emits 8 URLs (4 routes × `id`/`en` locales) with `<xhtml:link rel="alternate" hreflang>` annotations. |
| PWA manifest | [`app/manifest.ts`](./app/manifest.ts) | Generates `/manifest.webmanifest` for mobile install + brand SERP. |
| Root structured data | [`components/StructuredData.tsx`](./components/StructuredData.tsx) | Renders `Organization` + `WebSite` JSON-LD (brand entity, sitelinks searchbox, logo). |
| Per-tool structured data | [`components/ToolStructuredData.tsx`](./components/ToolStructuredData.tsx) | Renders `WebApplication` + `BreadcrumbList` JSON-LD on `/detect`, `/compare`, `/analyze`. |
| FAQ JSON-LD | [`components/FaqStructuredData.tsx`](./components/FaqStructuredData.tsx) | Renders `FAQPage` JSON-LD on the landing page. |
| Open Graph root | [`app/opengraph-image.tsx`](./app/opengraph-image.tsx) | Branded 1200×630 OG image for `/`. |
| Open Graph per-tool | `app/(tools)/{detect,compare,analyze}/opengraph-image.tsx` | Per-tool branded 1200×630 OG images. |
| Twitter card | [`app/twitter-image.tsx`](./app/twitter-image.tsx) | `summary_large_image` Twitter card. |
| About + FAQ content | [`components/MarketingSections.tsx`](./components/MarketingSections.tsx) | Server-rendered About, stat block, comparison table, and 10 Q&A. |
| Per-tool TL;DR | [`components/ToolTldr.tsx`](./components/ToolTldr.tsx) | 40–60 word answer-first summary + 4-step ordered list per tool. |
| LLMs description | [`public/llms.txt`](./public/llms.txt) + [`public/llms-full.txt`](./public/llms-full.txt) | Structured site summary for `GPTBot`, `PerplexityBot`, `ClaudeBot`, etc. |
| Canonical redirect | [`proxy.ts`](./proxy.ts) | 308 redirect to `www.guess-your-face.web.id` in production. |

### Environment Variables

Add to `.env.local` (already committed for this project, **do not commit your own**):

```env
FACEPP_API_KEY=your_faceplusplus_api_key
FACEPP_API_SECRET=your_faceplusplus_api_secret
NEXT_PUBLIC_SITE_URL=https://www.guess-your-face.web.id
```

`NEXT_PUBLIC_SITE_URL` is the source of truth for every absolute URL the app emits — sitemap entries, Open Graph images, canonical links, JSON-LD `url` fields, and `llms.txt` references. Override it per environment if you preview under a different host.

### Post-Deploy Steps

1. **Google Search Console**
   - Property → URL prefix → `https://www.guess-your-face.web.id`
   - Verification: HTML tag (the token is already wired into `app/layout.tsx`)
   - Sitemaps → submit `https://www.guess-your-face.web.id/sitemap.xml`
   - URL Inspection → request indexing for `/`, `/detect`, `/compare`, `/analyze`

2. **Bing Webmaster Tools**
   - Add site → **`Import from Google Search Console`** (one-click auto-verification)
   - Sitemaps → submit `https://www.guess-your-face.web.id/sitemap.xml`
   - (Optional) Enable **IndexNow** for instant URL submission

3. **Rich Results Validation**
   - https://search.google.com/test/rich-results → check `/`, `/detect`, `/compare`, `/analyze`
   - https://validator.schema.org/ → independent JSON-LD check

4. **Open Graph Preview**
   - https://www.opengraph.xyz/ → check share preview for every URL
   - https://cards-dev.twitter.com/validator → confirm Twitter cards

### Why This Matters

| Layer | What it does |
| :--- | :--- |
| **SEO** | Brand name appears in SERP (not the Vercel default domain), per-tool titles are unique, sitemap + hreflang consolidate bilingual URLs. |
| **GEO** | Generative engines (Google AI Overviews, Perplexity, ChatGPT Search) can quote the FAQ, the About section, and the `llms.txt` definitions verbatim because they are server-rendered HTML. |
| **AEO** | `FAQPage` schema + 40–60 word answers + comparison table make every URL eligible for featured snippets and voice answers. |
| **LLMO** | `llms.txt` + `llms-full.txt` give LLM crawlers a structured summary without needing to render the entire JavaScript bundle. |
