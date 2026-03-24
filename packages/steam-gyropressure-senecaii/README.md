# @openattitude/steam-gyropressure-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Vacuum / suction** gauge (Seneca II): needle from **suction (inHg)** via an internal table; optional **red warning lights** for left/right **vacuum inoperative** flags.

---

## Installation

```bash
npm install @openattitude/steam-gyropressure-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required.

---

## Export

**`GyroPressureGauge`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `suctionInHg` | `number \| null` | `null` | Suction (inHg), FG **`suction-inhg`**. |
| `vacuumInoperativeLeft` | `boolean` | `false` | Show left red warning icon. |
| `vacuumInoperativeRight` | `boolean` | `false` | Show right red warning icon. |

---

## Usage

```vue
<script setup lang="ts">
import { GyroPressureGauge } from '@openattitude/steam-gyropressure-senecaii';
</script>

<template>
  <GyroPressureGauge
    :suction-inhg="suction"
    :vacuum-inoperative-left="vacBadL"
    :vacuum-inoperative-right="vacBadR"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-gyropressure-senecaii
npm run test --workspace=@openattitude/steam-gyropressure-senecaii
npm run build --workspace=@openattitude/steam-gyropressure-senecaii
```
