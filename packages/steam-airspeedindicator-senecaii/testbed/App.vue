<script setup lang="ts">
import { ref } from 'vue';
import AirspeedIndicator from '@instrument/AirspeedIndicator.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(0);

const items: TestbedControlItem[] = [
  { name: 'Airspeed', min: 0, max: 300, step: 1, ref: p1 },
  { name: 'TAS', min: -180, max: 180, step: 1, ref: p2 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <AirspeedIndicator class="gauge" :indicated-speed-kt="p1" :tas-face-rotation-deg="p2" />
  </InstrumentTestbed>
</template>
