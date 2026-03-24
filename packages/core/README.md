# @openattitude/core

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

Shared **Vue 3** and **Pinia** building blocks for **OpenAttitude** panel instruments: live **FlightGear property** subscriptions over WebSocket, **SVG rasterization** for crisp steam-gauge faces, and **gauge math** helpers used across instrument packages.

**License:** LGPL-3.0-or-later
**Registry:** `@openattitude/core` on npm (part of the `openattitude-instruments` workspace).

---

## Installation

```bash
npm install @openattitude/core
```

### Peer dependencies

The package expects your app to provide compatible versions of:

| Package         | Purpose |
|----------------|---------|
| `vue` ^3.5     | Runtime & composition API |
| `pinia` ^3     | `useFlightGearPanelPropertiesStore` |
| `@vueuse/core` ^14 | WebSocket (`useWebSocket`) in the default FlightGear backend |

Install them in your application if you use the store or the default property backend:

```bash
npm install vue pinia @vueuse/core
```

---

## Quick start

### 1. Panel math (optional but typical for instruments)

Many gauges call `Math.interpolate` / `Math.clamp` after a one-time install:

```ts
// main.ts (or app bootstrap)
import { installPanelMath } from '@openattitude/core';

installPanelMath();
```

You can also import **`clamp`** and **`interpolate`** directly or use the Options API **`panelMathMixin`** (after `installPanelMath()`).

### 2. Steam-gauge SVG layers

Import **`PrerenderedSvgImage`** and pass a Vite-resolved SVG URL (default import) plus optional `transform` for needles and masks:

```vue
<script setup lang="ts">
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Needle from './needle.svg';
</script>

<template>
  <svg width="500" height="500" viewBox="0 0 500 500">
    <PrerenderedSvgImage :href="Face" />
    <PrerenderedSvgImage :href="Needle" :transform="`rotate(${angle} 250 250)`" />
  </svg>
</template>
```

The component rasterizes the SVG to a **canvas** (respecting `devicePixelRatio` and size), then references the result as an SVG `<image>` so complex assets stay sharp when scaled inside panel layouts.

### 3. Live FlightGear properties (Pinia)

Wire the store in your app, set the **generic host** (hostname or `host:port`, no scheme), then **`subscribe`** to property paths:

```ts
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { useFlightGearPanelPropertiesStore } from '@openattitude/core';

const app = createApp(App);
app.use(createPinia());

const fg = useFlightGearPanelPropertiesStore();
fg.host = 'localhost:8080'; // or '' to skip connecting (e.g. testbed-only props)

const altFt = fg.subscribe('/instrumentation/altimeter/indicated-altitude-ft', {
  type: 'double',
  e: 1.0, // numeric deadband hint (%), store implementation
});
```

The default backend opens:

`ws://<host>/PropertyListener`

and sends JSON commands `addListener` / `get` for each subscribed path, matching FlightGear’s generic **PropertyListener** WebSocket.

---

## API reference

### Math

| Export | Description |
|--------|-------------|
| **`clamp(val, min, max)`** | Inclusive numeric clamp. |
| **`interpolate(val, table)`** | Piecewise linear interpolation; `table` is `[x, y][]` sorted by `x`. Below first knot returns first `y`; above last returns last `y`. |
| **`installPanelMath()`** | Idempotently assigns `Math.clamp` and `Math.interpolate` if missing. Call once at startup if components use `Math.*`. |
| **`panelMathMixin`** | Options API mixin exposing `clamp` / `interpolate` on `this` (requires `installPanelMath()` first). |

TypeScript augments `Math` via **`math-global`** when you import from `@openattitude/core` (the package entry imports `./math`).

### Components

#### `PrerenderedSvgImage`

| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | Image URL (e.g. from `import asset from './x.svg'`). |
| `x`, `y` | `string \| number` | SVG `<image>` position. |
| `width`, `height` | `string \| number` | Optional explicit layout; inferred from natural size if omitted. |
| `transform` | `string` | SVG transform (e.g. needle rotation). |

Renders an **`<image>`** with computed `width`/`height` after rasterizing `href`. Uses **`ResizeObserver`** to refresh when the element’s box changes. Intended for **browser** environments (canvas + `window.devicePixelRatio`).

### FlightGear properties (Pinia + pluggable backend)

| Export | Role |
|--------|------|
| **`useFlightGearPanelPropertiesStore()`** | Pinia store: `host`, `isConnected`, `subscribe`, `disconnect`, `connect`. |
| **`createFlightGearPropertyListenerBackend()`** | Factory for the **default** WebSocket backend (`ws://…/PropertyListener`). |
| **`getPanelPropertyBackend` / `setPanelPropertyBackendFactory` / `resetPanelPropertyBackendFactory`** | Replace how the store connects (tests, another simulator, custom transport). Call **`setPanelPropertyBackendFactory`** before connect or after **`disconnect`**. |
| **Types** | `PanelPropertyBackend`, `PanelPropertyConnection`, `PropertyWireMessage`, `PropertySubscription`, `WatchedProperty`, etc. |

#### Store behaviour (summary)

- **`host`**: Watching `host` reconnects: empty string → no socket; **`isConnected`** is treated as “useful” when no host is set (offline/testbed UX).
- **`subscribe(path, options?)`**: Returns a **`Ref`** updated from wire messages. Options may include `type` (`double` / `float` / `int` / `bool`), `e` (numeric epsilon filter), `trace` (logging).
- **`unsubscribe`**: Currently throws “not implemented” (subscribe is ref-counted by path internally for updates only).

Implement **`PanelPropertyBackend`** to forward **`onPropertyMessage({ path, value, type })`** in a shape the store understands, and drive **`onConnected` / `onDisconnected` / `onError`** so **`isConnected`** stays accurate.

---

## Replacing the property backend

Useful for **unit tests** or a **non–FlightGear** data source:

```ts
import {
  setPanelPropertyBackendFactory,
  resetPanelPropertyBackendFactory,
  type PanelPropertyBackend,
} from '@openattitude/core';

setPanelPropertyBackendFactory(() => myMockBackend satisfies PanelPropertyBackend);
// … run tests …
resetPanelPropertyBackendFactory();
```

---

## Development

From the **monorepo root** (`library/`):

```bash
npm install
npm run test --workspace=@openattitude/core
npm run build --workspace=@openattitude/core
```

Or inside **`packages/core`**:

```bash
npm test
npm run build
```

Vitest runs `src/**/*.test.ts` (see **`vitest.config.ts`**).

---

## Publishing

This package is published as **`@openattitude/core`** from the parent workspace. Version bumps live in **`package.json`**. Downstream instrument packages should keep their **`@openattitude/core`** semver range aligned (e.g. `^0.1.0`) when you release breaking or incompatible changes.

---

## Related packages

Instrument packages (`@openattitude/steam-*`, `@openattitude/other-gps-generic`, …) depend on **core** for **`PrerenderedSvgImage`**, **`installPanelMath`**, and often the panel property store when embedded in a FlightGear-connected host.

---

## See also

- [npm: Trusted publishing](https://docs.npmjs.com/trusted-publishers) (CI OIDC for releases)
- FlightGear **PropertyListener** protocol (JSON `addListener` / `get` on the generic WebSocket path)
