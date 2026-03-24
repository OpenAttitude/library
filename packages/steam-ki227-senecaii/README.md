# @openattitude/steam-ki227-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**KI 227 ADF-style** rosette: rotating **compass card** from aircraft heading and a **bearing pointer** for relative bearing to station. Face + pointer + bezel use `@openattitude/core` **`PrerenderedSvgImage`**.

---

## Installation

```bash
npm install @openattitude/steam-ki227-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. No `Math.interpolate` in this component—**`installPanelMath()`** optional unless your app needs it for other gauges.

---

## Export

**`Ki227Adf`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicatedBearingDeg` | `number \| null` | `null` | Relative bearing to station (deg), FG **`indicated-bearing-deg`**. |
| `cardHeadingDeg` | `number \| null` | `null` | Compass card rotation (deg), FG **`rotation-deg`**. Card rotates **negative** heading; pointer rotates by **bearing**. |

---

## Usage

```vue
<script setup lang="ts">
import { Ki227Adf } from '@openattitude/steam-ki227-senecaii';
</script>

<template>
  <Ki227Adf
    :indicated-bearing-deg="bearing"
    :card-heading-deg="cardDeg"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-ki227-senecaii
npm run test --workspace=@openattitude/steam-ki227-senecaii
npm run build --workspace=@openattitude/steam-ki227-senecaii
```
