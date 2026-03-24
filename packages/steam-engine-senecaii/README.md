# @openattitude/steam-engine-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Horizontal engine strip** (1100×128 SVG): **five** vertical bar gauges on one face—

1. **Alternator / bus current** (A)  
2. **CHT** (°F)  
3. **Oil temperature** (°F)  
4. **Oil pressure** (PSI)  
5. **Fuel quantity** (US gal)

Each bar rotates about a fixed pivot encoded in the component; values map through separate piecewise-linear tables.

---

## Installation

```bash
npm install @openattitude/steam-engine-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required (**`Math.interpolate`** per channel).

---

## Export

**`EngineInstruments`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `busCurrentA` | `number \| null` | `null` | Electrical bus load (A); FG `.../bus/element[n]/i`-style quantity. |
| `chtDegF` | `number \| null` | `null` | Cylinder head temperature (°F). |
| `oilTempDegF` | `number \| null` | `null` | Oil temperature (°F). |
| `oilPressurePsi` | `number \| null` | `null` | Oil pressure (PSI). |
| `fuelLevelGalUs` | `number \| null` | `null` | Fuel level (US gal). |

All nulls interpolate as **0** in the current implementation.

**Layout:** Designed as a **wide** strip; host panels should assign width/height via CSS (e.g. flex or fixed aspect) so the `viewBox` scales cleanly.

---

## Usage

```vue
<script setup lang="ts">
import { EngineInstruments } from '@openattitude/steam-engine-senecaii';
</script>

<template>
  <EngineInstruments
    :bus-current-a="busI"
    :cht-deg-f="cht"
    :oil-temp-deg-f="oilT"
    :oil-pressure-psi="oilP"
    :fuel-level-gal-us="fuelGal"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-engine-senecaii
npm run test --workspace=@openattitude/steam-engine-senecaii
npm run build --workspace=@openattitude/steam-engine-senecaii
```
