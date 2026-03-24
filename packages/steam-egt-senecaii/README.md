# @openattitude/steam-egt-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Exhaust gas temperature** (EGT) gauge (Seneca II steam style): single needle versus a **1200–1700 °F** linear segment (piecewise table with two knots); pivot at **(250, 350)**.

---

## Installation

```bash
npm install @openattitude/steam-egt-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required.

---

## Export

**`EgtIndicator`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `egtDegF` | `number \| null`    | `null` | EGT (°F), FG **`egt-degf`**. Treated as **0** when `null` for interpolation (clamps below table to min angle). |

---

## Usage

```vue
<script setup lang="ts">
import { EgtIndicator } from '@openattitude/steam-egt-senecaii';
</script>

<template>
  <EgtIndicator :egt-deg-f="egt" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-egt-senecaii
npm run test --workspace=@openattitude/steam-egt-senecaii
npm run build --workspace=@openattitude/steam-egt-senecaii
```

Spec coverage: `src/EgtIndicator.spec.ts` exercises table endpoints, mid-point interpolation, clamping, and `null` handling.
