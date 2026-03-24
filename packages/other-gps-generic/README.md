# @openattitude/other-gps-generic

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Leaflet-based moving map** for OpenAttitude panels: dark basemap tiles (Carto / OSM), optional openAIP overlay, and a custom **aircraft** layer (position + heading). Props drive map center, zoom, and aircraft pose—suitable for binding to FlightGear GPS/heading properties in a host app.

This package does **not** depend on `@openattitude/core`; it only needs **Vue 3** and **Leaflet**.

---

## Installation

```bash
npm install @openattitude/other-gps-generic leaflet
```

Peer dependencies: `vue` ^3.5, `leaflet` ^1.9.

### Styles

Import the bundle stylesheet so the map container and aircraft icon class render correctly:

```ts
import '@openattitude/other-gps-generic/style.css';
```

(or `@openattitude/other-gps-generic/dist/other-gps-generic.css` — see `package.json` `exports`.)

---

## Component

### `GenericGps`

| Prop | Type | Description |
|------|------|-------------|
| `latitudeDeg` | `number \| null \| undefined` | Aircraft latitude (deg). |
| `longitudeDeg` | `number \| null \| undefined` | Aircraft longitude (deg). |
| `headingDeg` | `number \| null \| undefined` | Heading (deg); affects icon rotation and map offset. |
| `zoomLevel` | `number \| null \| undefined` | Zoom level; clamped roughly between **5** and **19** when the map is active. |
| `openaipApiKey` | `string \| null \| undefined` | openAIP tile API key ([openaip.net](https://www.openaip.net)). If omitted or blank, only base map tiles are shown—the key is never read from this package’s source. |

The root element uses class **`other-gps-generic__map`**. Width/height are intended to come from the host layout (e.g. panel cutout CSS), not from hard-coded dimensions inside the component.

Pass the key from your host (e.g. Vite **`import.meta.env.VITE_OPENAIP_API_KEY`**, runtime config, or server proxy) rather than committing it into this component.

---

## Usage

```vue
<script setup lang="ts">
import { GenericGps } from '@openattitude/other-gps-generic';
import '@openattitude/other-gps-generic/style.css';

const openaipKey = import.meta.env.VITE_OPENAIP_API_KEY as string | undefined;
</script>

<template>
  <GenericGps
    class="my-panel-cutout"
    :latitude-deg="50.0"
    :longitude-deg="10.0"
    :heading-deg="270"
    :zoom-level="11"
    :openaip-api-key="openaipKey"
  />
</template>
```

---

## Development

From the monorepo `library/` root:

```bash
npm run dev:testbed --workspace=@openattitude/other-gps-generic
npm run test --workspace=@openattitude/other-gps-generic
npm run build --workspace=@openattitude/other-gps-generic
```

To show the openAIP overlay in the testbed, create `packages/other-gps-generic/.env` with `VITE_OPENAIP_API_KEY=<your key>` (do not commit that file).

---

## Related

Other `@openattitude/*` instrument packages use `@openattitude/core` for SVG rasterization and gauge math; this package is standalone aside from Vue + Leaflet.
