# @openattitude/steam-turncoordinator-generic

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Turn coordinator**: miniature aircraft bank/screw symbol from **indicated turn rate**, and **slip/skid ball** from **indicated slip/skid**. Steam-style artwork via `@openattitude/core` **`PrerenderedSvgImage`**; ball is a native SVG circle with rotation transform.

---

## Installation

```bash
npm install @openattitude/steam-turncoordinator-generic @openattitude/core vue
```

Peers: `vue` ^3.5. Call **`installPanelMath()`** at bootstrap — the gauge uses **`Math.clamp`** for turn and ball limits.

---

## Export

**`TurnCoordinator`**

### Props

| Prop | Type | Description |
|------|------|-------------|
| `indicatedTurnRate` | `number \| null \| undefined` | Turn rate (implementation-defined units); scaled ×20 and clamped to **±40°** aircraft rotation. |
| `indicatedSlipSkid` | `number \| null \| undefined` | Slip/skid input; scaled and clamped for ball travel. |

---

## Usage

```vue
<script setup lang="ts">
import { TurnCoordinator } from '@openattitude/steam-turncoordinator-generic';
</script>

<template>
  <TurnCoordinator
    :indicated-turn-rate="turnRate"
    :indicated-slip-skid="slipSkid"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-turncoordinator-generic
npm run test --workspace=@openattitude/steam-turncoordinator-generic
npm run build --workspace=@openattitude/steam-turncoordinator-generic
```
