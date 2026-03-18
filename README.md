# SuperMega Sitebuilder — AI Page Builder Prototype

A working prototype demonstrating an AI-powered page building feature for the Hub Sitebuilder. Built in **~2.5 hours** using Claude Code.

## What This Is

The Hub Sitebuilder is an internal tool that lets users build intranet pages using pre-designed content blocks (headers, text layouts, image sections, etc.). This prototype adds a new concept: **an integrated AI chatbot (HubGPT) that builds pages from natural language descriptions**.

A user opens the chat panel, describes the page they want, and watches as the sitebuilder assembles it — complete with skeleton loading states and animated reveals.

## What We Built

### Editor Shell (Figma-driven)
- Hub Header with search, notifications, and avatar
- Main canvas area with page shadow and expand/contract fullscreen toggle
- Component menu (left edge) — move, duplicate, color, responsive, close — each with unique color hover states from Figma
- Widgets sidebar (right) — 11 accordion categories with 60+ widget items mapped from the Figma component library
- Bottom menubar — Go Back, Save & Preview, Save as Draft, Ready for Approval, Save & Publish

### Content Blocks
- **Header Large** — full-width hero with background image, dark gradient overlay, title, subtitle, and CTA button
- **Two Column Text** — side-by-side content sections (Eligibility / How to Apply)
- **Image / Text Split** — heading, body text, and link alongside a full-height image
- **Three Card Image Links** — image cards with overlay text (Travel & Adventure, Learning & Growth, Rest & Wellbeing)

All blocks themed around a **Sabbatical Program** page as a realistic intranet use case.

### HubGPT Chat Panel
- Slide-in chat panel triggered by the "Ask HubGPT" button (gradient hover animation inspired by HubGPT Figma designs)
- HubGPT branding with robot icon and verified badge
- User and bot message bubbles with avatars
- Auto-sizing input field (3 lines)
- New Chat button to reset the demo
- Button stays filled when panel is open

### Scripted Demo Sequence
- **Step 1**: Pre-filled prompt asks for a hero header and two-column section → skeleton loaders shimmer on canvas → real blocks fade in with a red→purple→blue gradient sweep effect
- **Step 2**: Second prompt auto-fills for image section and cards → more skeletons → blocks reveal
- Canvas auto-scrolls as blocks appear
- New Chat resets everything for re-runs

### Guided Walkthrough
- Floating card guides the developer through each demo step
- Auto-advances when user performs expected actions
- Dismissible at any time (refresh to bring back)

### Fullscreen Preview
- Expand arrow (top-right of canvas) toggles a fullscreen view
- Hides component menu, sidebar, and menubar for a clean page preview
- Contract arrow returns to editor

## Design Sources

- **Site Builder Library** — Figma file `mLY0XE9y0mR0aSlImYDeoo` (editor layout, widget categories, component menu hover states)
- **HubGPT** — Figma file `hkeAaAmemNs25HCYkL3D5X` (chat panel layout, message bubbles, input area, gradient button)
- **SuperMega Design System** — React component library (Hub Header, icons, logos, design tokens)

## Tech Stack

- React 18 + TypeScript
- Vite + vite-plugin-svgr
- Plain CSS (no Tailwind, no CSS-in-JS)
- GitHub Pages deployment via GitHub Actions

## Running Locally

```bash
npm install
npm run dev
```
