# @openattitude/steam-altimeter20kft-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**Steam altimeter** with **10k**, **1k**, and **100** ft drums/pointers, plus **Kollsman** window rotation from barometric setting. Behaviour matches the legacy fgpanel altimeter mapping for the setting knob (hpa/mbar).

---

## Installation

```bash
npm install @openattitude/steam-altimeter20kft-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. Call **`installPanelMath()`** — uses **`Math.clamp`** on the baro setting path.

---

## Export

**`Altimeter20kFt`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indicatedAltitudeFt` | `number \| null` | `null` | Indicated altitude (feet). Treated as **0** when `null`. |
| `settingHpa` | `number \| null` | `null` | Barometric setting (hPa/mbar), FG **`setting-hpa`**. `null` is handled like **0** for the Kollsman transform in current implementation. |

Each pointer rotates **`(value / drum_resolution) * 36`** degrees about the gauge center; see component source for 10k / 1k / 100 relationships to `indicatedAltitudeFt`.

---

## Usage

```vue
<script setup lang="ts">
import { Altimeter20kFt } from '@openattitude/steam-altimeter20kft-senecaii';
</script>

<template>
  <Altimeter20kFt
    :indicated-altitude-ft="altFt"
    :setting-hpa="baroHpa"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-altimeter20kft-senecaii
npm run test --workspace=@openattitude/steam-altimeter20kft-senecaii
npm run build --workspace=@openattitude/steam-altimeter20kft-senecaii
```
