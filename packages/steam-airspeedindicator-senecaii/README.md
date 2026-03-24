# @openattitude/steam-airspeedindicator-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Seneca II–style combined airspeed instrument**: **IAS** face with a knot calibration table, movable **TAS** sub-face rotation, and a single **needle** over the IAS graticule. Built with `@openattitude/core` **`PrerenderedSvgImage`** for rasterized SVG assets.

---

## Installation

```bash
npm install @openattitude/steam-airspeedindicator-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. Call **`installPanelMath()`** at app bootstrap (**`Math.interpolate`** for IAS vs needle angle).

---

## Export

**`AirspeedIndicator`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicatedSpeedKt` | `number \| null` | `null` | Indicated airspeed (knots). Treated as **0** when `null`. |
| `tasFaceRotationDeg` | `number \| null` | `null` | True-airspeed disk rotation (degrees), e.g. from FG **`tas-face-rotation`**. Applied as **negative** rotation on the TAS layer. |

IAS→needle mapping uses an internal knot table from **0** to **230** kt (piecewise linear).

---

## Usage

```vue
<script setup lang="ts">
import { AirspeedIndicator } from '@openattitude/steam-airspeedindicator-senecaii';
</script>

<template>
  <AirspeedIndicator
    :indicated-speed-kt="iasKt"
    :tas-face-rotation-deg="tasDiskDeg"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-airspeedindicator-senecaii
npm run test --workspace=@openattitude/steam-airspeedindicator-senecaii
npm run build --workspace=@openattitude/steam-airspeedindicator-senecaii
```
