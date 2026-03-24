<script setup lang="ts">
import { ref } from 'vue';
import Ki227Adf from '@instrument/Ki227Adf.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(0);

const items: TestbedControlItem[] = [
  { name: 'Bearing', min: -180, max: 180, step: 0.1, ref: p1 },
  { name: 'Heading', min: 0, max: 360, step: 0.1, ref: p2 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <Ki227Adf class="gauge" :indicated-bearing-deg="p1" :card-heading-deg="p2" />
  </InstrumentTestbed>
</template>
