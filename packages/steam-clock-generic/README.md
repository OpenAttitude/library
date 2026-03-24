# @openattitude/steam-clock-generic

Copyright (c) Torsten Dreyer (<torsten@t3r.de>). SPDX-License-Identifier: LGPL-3.0-or-later.

Analog **steam-style clock** (500×500 SVG): hour, minute, and second hands driven by **UTC day seconds**—the same quantity FlightGear exposes as `/sim/time/utc/day-seconds`.

---

## Installation

```bash
npm install @openattitude/steam-clock-generic @openattitude/core vue
```

Peers: `vue` ^3.5. Call **`installPanelMath()`** from `@openattitude/core` at app bootstrap if your codebase relies on patched `Math` elsewhere (this gauge only uses basic arithmetic on props).

---

## Export

**`GenericClock`** — default export re-exported from the package entry.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `utcDaySeconds` | `number \| null` | `null` | Seconds since UTC midnight (same as FG **`/sim/time/utc/day-seconds`**). Treated as **0** when `null`. |

Hand rotations are derived in the component: second hand `6°` per second, minute hand scaled from day seconds, hour hand one full rotation per 12h of elapsed seconds in the UTC day.

---

## Usage

```vue
<script setup lang="ts">
import { GenericClock } from '@openattitude/steam-clock-generic';
</script>

<template>
  <GenericClock :utc-day-seconds="fgUtcDaySeconds" />
</template>
```

---

## Development

```bash
npm run dev:testbed --workspace=@openattitude/steam-clock-generic
npm run test --workspace=@openattitude/steam-clock-generic
npm run build --workspace=@openattitude/steam-clock-generic
```
