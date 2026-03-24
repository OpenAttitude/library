# @openattitude/steam-fuelflow-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Dual fuel flow** gauge (Seneca II): **left** and **right** engine flow in **GPH**, each needle driven by a shared piecewise-linear table on one instrument face.

---

## Installation

```bash
npm install @openattitude/steam-fuelflow-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required.

---

## Export

**`DualFuelFlow`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fuelFlowGphLeft` | `number \| null` | `null` | Left / engine 0 fuel flow (GPH), FG **`fuel-flow-gph`**. |
| `fuelFlowGphRight` | `number \| null` | `null` | Right engine fuel flow. |

Missing values use **0** for interpolation. Table covers roughly **0–25** GPH in the component source.

---

## Usage

```vue
<script setup lang="ts">
import { DualFuelFlow } from '@openattitude/steam-fuelflow-senecaii';
</script>

<template>
  <DualFuelFlow :fuel-flow-gph-left="ff0" :fuel-flow-gph-right="ff1" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-fuelflow-senecaii
npm run test --workspace=@openattitude/steam-fuelflow-senecaii
npm run build --workspace=@openattitude/steam-fuelflow-senecaii
```
