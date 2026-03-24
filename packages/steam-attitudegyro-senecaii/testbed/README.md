# Instrument testbed (repeatable template)

Use this layout in every `@openattitude/*` instrument package so each gauge can be exercised without the main panel app.

## Layout

| Path | Role |
|------|------|
| `testbed/index.html` | Vite entry page |
| `testbed/main.ts` | `createApp` bootstrap |
| `testbed/App.vue` | **Instrument-specific**: refs, `items`, and the SUT in the slot |
| `testbed/testbed.css` | Global styles for the dev shell |
| `testbed/lib/types.ts` | `TestbedControlItem` |
| `testbed/lib/PropertyControl.vue` | Slider + number + optional range editor |
| `testbed/lib/InstrumentTestbed.vue` | Sidebar + main stage (slot) |

## Vite

- Library build: root `vite.config.ts` (publishable `dist/`).
- Testbed dev server: `vite.testbed.config.ts` with `root: testbed/` and alias `@instrument` → package `src/`.

## npm scripts (in `package.json`)

```json
"dev:testbed": "vite --config vite.testbed.config.ts",
"build:testbed": "vite build --config vite.testbed.config.ts"
```

## New package checklist

1. Copy `testbed/` and `vite.testbed.config.ts` from this package.
2. Point `@instrument` in `vite.testbed.config.ts` at that package’s `src/`.
3. Replace `App.vue` with your instrument’s props and controls.
4. Add the scripts above.

The testbed is **not** published (`package.json` `"files": ["dist"]` only).
