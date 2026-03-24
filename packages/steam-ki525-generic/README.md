# @openattitude/steam-ki525-generic

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

**KI 525A-style HSI**: rotating **compass** rose, **heading bug**, **course** index and CDI needle inside a **course card** group, **nav/heading** warning flags, optional **glideslope** diamond with deflection, TO/FROM flags, and outer frames. Behaviour depends strongly on **`navDataValid`** for CDI translation, flag positions, and GS visibility.

---

## Installation

```bash
npm install @openattitude/steam-ki525-generic @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required (**`Math.clamp`** throughout).

---

## Export

**`Ki525`**

### Props (summary)

| Prop | Role |
|------|------|
| `indicatedHeadingDeg` | Aircraft heading; drives compass rotation. |
| `selectedHeadingDeg` | Heading bug vs indicated heading (relative rotation). |
| `selectedCourseDeg` | Selected course vs indicated heading; rotates the course / CDI group. |
| `cdiDeflection` | Lateral CDI deflection (scaled/clamped when `navDataValid`). |
| `gsDeflection` | Glideslope deflection (vertical translation of GS symbol). |
| `navFlagNorm`, `headingFlagNorm` | Warning flag animations. |
| `toFlagNorm`, `fromFlagNorm` | TO/FROM bar positions inside the course disk. |
| `hasGlideslope`, `gsInRange`, `navDataValid` | Whether GS is shown and nav is trusted. |

Exact formulas and thresholds are in `src/Ki525.vue` (`showGlideslope`, `showHdgFlag`, `showTo`, etc.).

---

## Usage

```vue
<script setup lang="ts">
import { Ki525 } from '@openattitude/steam-ki525-generic';
</script>

<template>
  <Ki525
    :indicated-heading-deg="hdg"
    :selected-course-deg="crs"
    :cdi-deflection="cdiDots"
    :nav-data-valid="navOk"
  />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-ki525-generic
npm run test --workspace=@openattitude/steam-ki525-generic
npm run build --workspace=@openattitude/steam-ki525-generic
```
