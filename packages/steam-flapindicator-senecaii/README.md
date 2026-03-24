# @openattitude/steam-flapindicator-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Flap position + elevator trim** indicator: needle rotation from **normalized flap position** (0–1), and a **trim bar** translated vertically from **normalized elevator trim**.

---

## Installation

```bash
npm install @openattitude/steam-flapindicator-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required (**`Math.clamp`** on trim).

---

## Export

**`FlapIndicator`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flapsNorm` | `number \| null` | `null` | Flap position **0–1**, FG **`flap-pos-norm`**. Drives needle angle (linear map around a fixed pivot chain). |
| `trimNorm` | `number \| null` | `null` | Elevator trim normalized, FG **`elevator-trim`**. Scaled and **clamped** for bar vertical shift. |

---

## Usage

```vue
<script setup lang="ts">
import { FlapIndicator } from '@openattitude/steam-flapindicator-senecaii';
</script>

<template>
  <FlapIndicator :flaps-norm="flapNorm" :trim-norm="trimNorm" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-flapindicator-senecaii
npm run test --workspace=@openattitude/steam-flapindicator-senecaii
npm run build --workspace=@openattitude/steam-flapindicator-senecaii
```
