# ⚡ PlayNova (TechSomnia)

<div align="center">

![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-22C55E?style=for-the-badge&logo=github&logoColor=white)

<br />

**A next-generation, cloud-gaming storefront & browser streaming platform concept built with high-fidelity visuals, reactive animations, and glassmorphic UI.**

[**🎮 Experience Live Demo**](https://anany1014.github.io/TechSomnia/) · [Report Bug](https://github.com/Anany1014/TechSomnia/issues) · [Request Feature](https://github.com/Anany1014/TechSomnia/issues)

</div>

---

## 🌟 Overview

**PlayNova** is an editorial cloud gaming portal designed for seamless desktop and browser-based game discovery. Featuring an immersive cyber-liquid aesthetic, reactive fluid animations, and real-time session simulation, PlayNova models the experience of modern cloud gaming ecosystems (GeForce NOW, Xbox Cloud Gaming, PlayStation Plus).

Users can browse AAA titles, filter by genre, inspect metacritic rankings and cloud telemetry (latency, bitrate, FPS), build a persistent wishlist vault, and launch simulated 4K 120Hz cloud gaming sessions directly in-browser.

---

## ✨ Key Features

### 🎮 Cloud Gaming Storefront
* **Hero Carousel & Live Switcher**: Dynamic AAA showcase with auto-advancing slides, video/backdrop switching, and immediate play hooks.
* **Instant Search & Genre Filtering**: Real-time multi-attribute search across titles, developers, genres, and metadata tags.
* **Editorial Curations**: "Critically Acclaimed" spotlight, "Popular Right Now" trending rail, and full sortable catalog (by player count and Metacritic rating).

### 🕹️ Interactive Cloud Session Modal
* **Low-Latency Stream Simulation**: Simulated real-time streaming HUD displaying 4K 120Hz status, bitrate, connection jitter, and stream health.
* **Interactive In-Stream Controls**: Gamepad/keyboard overlay, stream pause/resume, aspect-ratio scaling, full-screen theater mode, and celebration confetti.
* **Live Quick-Switching**: Browse and switch to other cloud titles without exiting the active session.

### 💎 Next-Level UI/UX
* **Silk Liquid Ambient Canvas**: Interactive animated gradient background mimicking flowing chromatic liquid purple & deep obsidian.
* **Persistent Wishlist Vault**: Slide-over drawer allowing users to bookmark titles and resume sessions quickly.
* **Recently Played Rail**: Tracks session history, play time, and recent activity timestamps.
* **Mobile-Optimized & Accessible**: Fully responsive layout tailored for desktops, tablets, and mobile screens.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | [React 18](https://react.dev/) | Component architecture, state hooks, and virtual DOM |
| **Build Tool** | [Vite 5](https://vitejs.dev/) | Ultra-fast HMR and optimized production bundling |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling with custom glassmorphism and studio themes |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) | Smooth layout transitions, slide-over modals, and hover micro-interactions |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent SVG icon set |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Dynamic particle effects on game stream achievements |
| **Deployment** | [GitHub Pages](https://pages.github.com/) | Automated automated production build distribution |

---

## 📁 Project Architecture

```text
TechSomnia/
├── public/
│   └── images/
│       ├── real/             # High-resolution game cover arts & banners
│       └── liquid-gradient*  # Ambient textures and references
├── src/
│   ├── components/
│   │   ├── ArcadeCard.jsx        # Standard & editorial catalog game cards
│   │   ├── ArcadeIcons.jsx       # Custom gaming & platform vector glyphs
│   │   ├── GameStageModal.jsx    # Simulated cloud-streaming stage overlay
│   │   ├── HeroCarousel.jsx      # Spotlight hero banner with live rail switcher
│   │   ├── LiquidBackground.jsx  # Animated fluid chromatic background canvas
│   │   └── Navbar.jsx            # Header navigation, live search, and vault trigger
│   ├── data/
│   │   └── games.js              # Catalog database, genres, and metadata definitions
│   ├── App.jsx                   # Central layout and application state orchestrator
│   ├── index.css                 # Global styling, backdrop filters, and custom scrollbars
│   └── main.jsx                  # Application entry point
├── deploy.mjs                    # Automated Vite build & GitHub Pages deployment pipeline
├── index.html                    # Root HTML document with SEO meta headers
├── tailwind.config.js            # Custom design tokens, palettes, and animations
└── vite.config.js                # Vite build and asset path configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (version **18.x** or higher recommended)
* [npm](https://www.npmjs.com/) (bundled with Node.js) or `pnpm` / `yarn`

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anany1014/TechSomnia.git
   cd TechSomnia
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```

4. **View in browser:**
   Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

---

## 📦 Build & Deployment

### Manual Build
To generate an optimized production bundle in the `dist/` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### GitHub Pages Deployment
A dedicated deployment script [`deploy.mjs`](./deploy.mjs) handles relative asset mapping and pushes the production bundle to the `gh-pages` branch:

```bash
node deploy.mjs
```

Once pushed, verify that your repository settings under **Settings > Pages** are set to:
* **Source**: `Deploy from a branch`
* **Branch**: `gh-pages` / `/(root)`

---

## 🎮 Featured Titles in Demo

* **Black Myth: Wukong** — Game Science (Action RPG)
* **Cyberpunk 2077: Phantom Liberty** — CD PROJEKT RED (Open World RPG)
* **Elden Ring: Shadow of the Erdtree** — FromSoftware (Action RPG)
* **Forza Horizon 5** — Playground Games (Racing)
* **Ghost of Tsushima** — Sucker Punch Productions (Action Adventure)
* **Valorant** — Riot Games (Tactical Shooter)
* *...and over a dozen more critically acclaimed titles.*

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the UI, add new features, or optimize performance:

1. **Fork** the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

<div align="center">
  <sub>Crafted with 💜 for gamers and cloud technology enthusiasts.</sub>
</div>
