# @openattitude/steam-manifoldpressure-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Dual manifold pressure** gauge (Seneca II): separate needles for **left** and **right** engine manifold pressure (**inHg OSI**), interpolated over a shared calibration table on a common face.

---

## Installation

```bash
npm install @openattitude/steam-manifoldpressure-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required (**`Math.interpolate`**).

---

## Export

**`DualManifoldPressure`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mpOsiLeft` | `number \| null` | `null` | Left / engine 0 manifold pressure (inHg OSI), FG **`mp-osi`**. |
| `mpOsiRight` | `number \| null` | `null` | Right engine manifold pressure. |

Null values are treated as **0** for interpolation. Rotation pivot is **(250, 250)**.

---

## Usage

```vue
<script setup lang="ts">
import { DualManifoldPressure } from '@openattitude/steam-manifoldpressure-senecaii';
</script>

<template>
  <DualManifoldPressure :mp-osi-left="mp0" :mp-osi-right="mp1" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-manifoldpressure-senecaii
npm run test --workspace=@openattitude/steam-manifoldpressure-senecaii
npm run build --workspace=@openattitude/steam-manifoldpressure-senecaii
```
