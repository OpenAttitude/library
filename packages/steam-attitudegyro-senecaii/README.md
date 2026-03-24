# @openattitude/steam-attitudegyro-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Attitude indicator** (artificial horizon): roll rotates the horizon/pitch stack; pitch translates the ladder with **±19°** clamp at **5 px/deg**. Includes **annunciator** blocks (Gear, GS, OVR, FP, Gyro, OIL, ALT) driven by boolean props.

---

## Installation

```bash
npm install @openattitude/steam-attitudegyro-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required (**`Math.clamp`** on pitch).

---

## Export

**`AttitudeIndicator`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pitchDeg` | `number \| null` | `null` | Pitch (deg), clamped to ±19 for display translation. |
| `rollDeg` | `number \| null` | `null` | Roll (deg); outer group rotates **negative** roll. |
| `gearLight` | `boolean` | `false` | Show “Gear” annunciator. |
| `gsLight` | `boolean` | `false` | Show “GS” (green). |
| `ovrLight1`, `ovrLight2` | `boolean` | `false` | “OVR” annunciators. |
| `fpLight1`, `fpLight2` | `boolean` | `false` | “FP” annunciators. |
| `oilLight` | `boolean` | `false` | “OIL” annunciator. |
| `gyroLight1`, `gyroLight2` | `boolean` | `false` | Either true shows **“Gyro”** lamp. |
| `altnLight` | `boolean` | `false` | “ALT” annunciator. |

---

## Usage

```vue
<script setup lang="ts">
import { AttitudeIndicator } from '@openattitude/steam-attitudegyro-senecaii';
</script>

<template>
  <AttitudeIndicator
    :pitch-deg="pitch"
    :roll-deg="roll"
    :gear-light="gearDown"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-attitudegyro-senecaii
npm run test --workspace=@openattitude/steam-attitudegyro-senecaii
npm run build --workspace=@openattitude/steam-attitudegyro-senecaii
```
