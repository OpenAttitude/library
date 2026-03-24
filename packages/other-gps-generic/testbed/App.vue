<script setup lang="ts">
import { ref } from 'vue';
import GenericGps from '@instrument/GenericGps.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

/** Set `VITE_OPENAIP_API_KEY` in `.env` in this package when running the testbed via Vite. */
const openaipApiKey = (import.meta.env.VITE_OPENAIP_API_KEY as string | undefined) ?? '';

const lat = ref(53.5);
const lng = ref(10.0);
const hdg = ref(45);
const zoom = ref(10);
const items: TestbedControlItem[] = [
  { name: 'Lat', min: -60, max: 60, step: 0.01, ref: lat },
  { name: 'Lng', min: -180, max: 180, step: 0.01, ref: lng },
  { name: 'Hdg °', min: 0, max: 360, step: 1, ref: hdg },
  { name: 'Zoom', min: 5, max: 19, step: 0.5, ref: zoom },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <div class="gps-stage">
      <GenericGps
        :latitude-deg="lat"
        :longitude-deg="lng"
        :heading-deg="hdg"
        :zoom-level="zoom"
        :openaip-api-key="openaipApiKey || undefined"
      />
    </div>
  </InstrumentTestbed>
</template>

<style scoped>
.gps-stage {
  width: min(90vw, 500px);
  height: min(90vw, 500px);
}

.gps-stage :deep(.other-gps-generic__map) {
  width: 100%;
  height: 100%;
}
</style>
