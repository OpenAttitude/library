<script setup lang="ts">
import { ref } from 'vue';
import DualFuelFlow from '@instrument/DualFuelFlow.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(0);
const items: TestbedControlItem[] = [
  { name: 'Left', min: 0, max: 30, step: 0.1, ref: p1 },
  { name: 'Right', min: 0, max: 30, step: 0.1, ref: p2 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <DualFuelFlow class="gauge" :fuel-flow-gph-left="p1" :fuel-flow-gph-right="p2" />
  </InstrumentTestbed>
</template>
