# @openattitude/steam-verticalspeedindicator-generic

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Steam-style vertical speed indicator** (VSI): needle rotation from a piecewise-linear **±2000 fpm** calibration table; face is a prerendered SVG layer, needle is inline vector paths.

---

## Installation

```bash
npm install @openattitude/steam-verticalspeedindicator-generic @openattitude/core vue
```

Peers: `vue` ^3.5.

**Important:** Call **`installPanelMath()`** once at application startup (`import { installPanelMath } from '@openattitude/core'`). The component uses **`Math.interpolate`** on the knot table.

---

## Export

**`VerticalSpeedIndicator`**

### Props

| Prop | Type | Description |
|------|------|-------------|
| `verticalSpeedFpm` | `number \| null \| undefined` | Vertical speed (ft/min). Treated as **0** when missing. |

Interpolation is defined internally for knots from **−2000** to **+2000** fpm; values outside the table clamp to the end angles.

---

## Usage

```vue
<script setup lang="ts">
import { VerticalSpeedIndicator } from '@openattitude/steam-verticalspeedindicator-generic';
</script>

<template>
  <VerticalSpeedIndicator :vertical-speed-fpm="vsiFpm" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-verticalspeedindicator-generic
npm run test --workspace=@openattitude/steam-verticalspeedindicator-generic
npm run build --workspace=@openattitude/steam-verticalspeedindicator-generic
```
