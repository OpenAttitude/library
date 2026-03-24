# OpenAttitude instruments

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

This repository contains **`@openattitude/core`** (shared panel utilities, Pinia store, SVG helpers) and all **instrument Vue packages** consumed by the **fgpanel** application and related tooling.

## Layout

- `packages/core` — shared library
- `packages/*` — individual instruments (each published as `@openattitude/...`)

## Setup

```bash
npm install
```

`postinstall` runs `npm run build --workspaces` so `dist/` outputs exist for consumers.

## Package builds

```bash
npm run build
```

## Instrument testbeds

Each instrument package exposes `dev:testbed` (Vite). From **this repository root**:

```bash
npm run dev:testbed --workspace=@openattitude/steam-clock-generic
```

Use the workspace name from that package’s `package.json`. Ports are fixed per package (see each `vite.testbed.config.ts` or the fgpanel testbed hub table).

## New Git repository

After copying or moving this tree out of the fgpanel repo, publish it as its own remote:

```bash
git init
git add .
git commit -m "Initial import: core + instrument packages"
git remote add origin <your-github-url>
git push -u origin main
```

## Consuming from fgpanel

During development, **fgpanel** expects this repository as a **sibling directory** named `openattitude-instruments`, with `file:` dependencies in its `package.json`.

To use a **Git remote** instead, publish these packages to npm (or GitHub Packages) and replace `file:` entries in fgpanel with semver ranges.
