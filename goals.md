# SuperMega Sitebuilder — Project Goals

## Context
A working prototype for a new feature in the Hub Sitebuilder project. The original sitebuilder was built using an older version of [ContentBuilder.js](https://innovastudio.com/contentbuilder) — a block-based page builder with row/column layouts and pre-built content blocks. We do not have access to the original codebase.

## Figma Source
- **File:** Site Builder Library (`mLY0XE9y0mR0aSlImYDeoo`)
- **Page 1 — "Components":** Block library (Headers, Separators, Text, Images & Text, Interactive, Maps, Video, Alerts, News, Misc Interface Elements)
- **Page 2 — "Editing Page":** Sitebuilder editor UI (template, sidebar, menubar, component menu, flyouts, icons)

## Goals

### 1. Working Prototype
Build a functional prototype of the sitebuilder — no dependency on ContentBuilder or other unknown libraries from the original project. Standalone React + Vite + TypeScript.

### 2. Figma-Driven
Use the Site Builder Library Figma file as the primary design source. Supplement with SuperMega design system components and tokens where they exist and are recognized. Hardcode values where no token exists. Some features may need to be inferred where designs don't fully specify behavior.

### 3. AI Chatbot Feature (New Feature Demo)
Integrated chat panel where users describe pages in natural language (e.g. "Build me a page with a hero image and 2-column layout"), and the chatbot assembles sitebuilder blocks automatically on the canvas. This is the new feature being demoed to stakeholders.

### 4. Scripted Multi-Step Demo
The chatbot is not live AI — it's a pre-scripted sequence for demo purposes:
- Pre-filled prompts in the chat input
- Click send to trigger each step
- Timed animations progressively assemble blocks on the canvas
- Multiple prompt → build rounds show iterative page construction
- The real implementation would eventually use a Glean agent connected to the sitebuilder tech stack

## Sitebuilder Editor Layout (from Figma)
- **Hub Header** — top bar (Hub logo, search, notifications, avatar)
- **Main Canvas** — center, white page area with shadow, where blocks are composed
- **Widgets Sidebar** — right side, accordion categories (Headers, Text, Images & Text, Interactive, Maps, Video, Alerts, News, Custom, Dgrp)
- **Menubar** — bottom bar (Go Back, Save & Preview, Save as Draft, Ready for Approval, Save & Publish)
- **Component Menu** — left edge of canvas, vertical icon toolbar (move, duplicate, color, responsive, close)
- **Expand/Contract Arrow** — top-right of canvas

## Project Location
`C:\Users\gary\Documents\GitHub\supermega-sitebuilder\`

## Source Components
Design system: `C:\Users\gary\Documents\GitHub\supermega-design-system\`
