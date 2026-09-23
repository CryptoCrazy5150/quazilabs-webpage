# Quazi Labs — Acquisition Site Design Brainstorm

## Three Stylistic Approaches

### Approach A: Deep Space Precision
**Theme:** Dark cosmic intelligence — deep navy/black backgrounds with electric cyan and gold accents. Mathematical precision meets cosmic scale.
**Probability:** 0.04

### Approach B: Obsidian Architecture
**Theme:** Brutalist-minimalist dark tech. Near-black backgrounds, razor-sharp typography, surgical white lines, and a single electric amber accent. Feels like a classified government research facility.
**Probability:** 0.09

### Approach C: Quantum Signal
**Theme:** Dark charcoal base with electric teal signal lines, subtle interference patterns in backgrounds, and warm gold for key metrics. Feels like looking at live oscilloscope data from inside a quantum lab.
**Probability:** 0.07

---

## Selected Approach: **B — Obsidian Architecture**

Probability 0.09 — selected.

### Design Movement
**Brutalist Tech Minimalism** — stripped of decoration, every element earns its place. Inspired by Bloomberg Terminal aesthetics and classified defense contractor interfaces.

### Core Principles
1. **Surgical Precision:** No rounded corners on structural elements. Sharp edges signal technical rigor.
2. **Information Hierarchy by Weight:** Typography does all the heavy lifting — no decorative icons, no gradients masking weak content.
3. **Negative Space as Signal:** Generous whitespace is not emptiness — it is the visual equivalent of a clean lab environment.
4. **One Accent, Absolute Discipline:** A single electric amber (#F5A623) is used exclusively for numbers, CTAs, and key differentiators.

### Color Philosophy
- **Background:** `oklch(0.10 0.005 260)` — near-black with a cold blue undertone, not pure black (which feels cheap)
- **Surface:** `oklch(0.14 0.006 260)` — slightly elevated cards
- **Foreground:** `oklch(0.92 0 0)` — warm off-white, never pure white
- **Accent:** `oklch(0.75 0.18 75)` — electric amber/gold — used sparingly, maximum impact
- **Muted:** `oklch(0.45 0.008 260)` — for secondary text

### Layout Paradigm
**Asymmetric Column Grid** — a persistent left-rail with a thin vertical rule carries section labels in small-caps. Content bleeds into a wider right column. No centered hero. The page reads like a technical brief, not a marketing brochure.

### Signature Elements
1. **Thin horizontal rules** (1px, 20% opacity) separating every major section
2. **Monospaced metric callouts** — key numbers rendered in a monospace font inside a tight amber border
3. **Section index labels** — `01 / 02 / 03` in small-caps muted text, left-aligned

### Interaction Philosophy
Interactions are deliberate and minimal. Hover states use a subtle left-border amber flash (200ms ease-out). Scroll-triggered entrance animations are restrained — elements translate up 20px and fade in, never bounce or scale dramatically.

### Animation
- Entrance: `translateY(20px) → translateY(0)` + `opacity: 0 → 1`, 400ms ease-out, staggered 60ms per item
- Hover on cards: `border-left: 2px solid amber` flash, 180ms
- CTA button: `scale(0.97)` on active, 160ms ease-out
- No looping animations. No parallax. No particle systems.

### Typography System
- **Display / Headlines:** `Space Grotesk` — geometric, technical, slightly condensed
- **Body:** `DM Sans` — highly readable, warm, not cold
- **Metrics / Code:** `JetBrains Mono` — for all numbers, formulas, and technical labels
- **Hierarchy:** 72px hero → 48px section → 32px subsection → 18px body → 13px label

### Brand Essence
**"The intelligence layer between today's hardware and tomorrow's quantum future."**
Personality: **Precise. Uncompromising. Inevitable.**

### Brand Voice
Headlines and CTAs are declarative, never interrogative. No questions. No "Are you ready?" No "Discover how."
- Example headline: *"We don't remove weights. We score them."*
- Example CTA: *"Request Technical Due Diligence Package"*
- Banned phrases: "Welcome to", "Get started", "Learn more", "Revolutionary", "Game-changing"

### Wordmark & Logo
A bold geometric Q with a single diagonal slash through the counter — suggesting both a quantum gate symbol and a "scored" weight. Rendered in amber on dark. No serifs. No gradients.

### Signature Brand Color
**Electric Amber** — `oklch(0.75 0.18 75)` — unmistakably Quazi.
