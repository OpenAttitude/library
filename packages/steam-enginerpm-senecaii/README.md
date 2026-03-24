# @openattitude/steam-enginerpm-senecaii

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

Single-engine **RPM** tachometer (Seneca II style): needle rotation is a **linear map** from RPM with **clamp** to **±128°** about the gauge center (**250**, **250**), anchored so **300 RPM** sits at the lower clamp and high RPM at full scale.

---

## Installation

```bash
npm install @openattitude/steam-enginerpm-senecaii @openattitude/core vue
```

Peers: `vue` ^3.5. **`installPanelMath()`** required.

---

## Export

**`EngineRpmGauge`**

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rpm` | `number \| null` | `null` | Engine speed (RPM), FG **`rpm`**. Treated as **0** when `null`. |

---

## Usage

```vue
<script setup lang="ts">
import { EngineRpmGauge } from '@openattitude/steam-enginerpm-senecaii';
</script>

<template>
  <EngineRpmGauge :rpm="engineRpm" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-enginerpm-senecaii
npm run test --workspace=@openattitude/steam-enginerpm-senecaii
npm run build --workspace=@openattitude/steam-enginerpm-senecaii
```
