<script setup lang="ts">
import { ref } from 'vue';
import Altimeter20kFt from '@instrument/Altimeter20kFt.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(1013);

const items: TestbedControlItem[] = [
  { name: 'Altitude', min: -1000, max: 30000, step: 10, ref: p1 },
  { name: 'Setting', min: 945, max: 1050, step: 1, ref: p2 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <Altimeter20kFt class="gauge" :indicated-altitude-ft="p1" :setting-hpa="p2" />
  </InstrumentTestbed>
</template>
