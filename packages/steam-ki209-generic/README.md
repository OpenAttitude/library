# @openattitude/steam-ki209-generic

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**KI 209–style NAV indicator**: rotating **OBS / compass** card, **CDI** (lateral) and **GSI** (vertical) bars, TO/FROM flags, nav/ GS warning flags, and a fixed reference arrow. When **`navDataValid`** is false, lateral/vertical deflections and flags are zeroed/hidden per the component’s visibility rules.

---

## Installation

```bash
npm install @openattitude/steam-ki209-generic @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required (**`Math.clamp`** on deflections and flags).

---

## Export

**`Ki209`**

### Props (all optional / nullable as declared)

| Prop | Description |
|------|-------------|
| `selectedObsDeg` | OBS / selected course (deg); compass rotates **negative** this angle. |
| `headingNeedleDeflectionNorm` | Normalized lateral needle; drives CDI **translateX** when valid. |
| `gsNeedleDeflectionNorm` | Normalized glideslope needle; drives GSI **translateY** when valid. |
| `toFlagNorm`, `fromFlagNorm` | TO/FROM flag positions (0–1 style); TO/FROM paths show when above threshold. |
| `hasGlideslope`, `gsInRange`, `navDataValid` | Nav validity and GS flag visibility logic. |
| `signalQualityNorm` | Affects nav warning flag when low or invalid. |

See `src/Ki209.vue` for exact clamp ranges and `v-if` rules.

---

## Usage

```vue
<script setup lang="ts">
import { Ki209 } from '@openattitude/steam-ki209-generic';
</script>

<template>
  <Ki209
    :selected-obs-deg="obs"
    :heading-needle-deflection-norm="locNorm"
    :gs-needle-deflection-norm="gsNorm"
    :nav-data-valid="navOk"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-ki209-generic
npm run test --workspace=@openattitude/steam-ki209-generic
npm run build --workspace=@openattitude/steam-ki209-generic
```
