<script setup lang="ts">
import { ref } from 'vue';
import DualManifoldPressure from '@instrument/DualManifoldPressure.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(15);
const p2 = ref(15);
const items: TestbedControlItem[] = [
  { name: 'Left', min: 0, max: 90, step: 0.5, ref: p1 },
  { name: 'Right', min: 0, max: 90, step: 0.5, ref: p2 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <DualManifoldPressure class="gauge" :mp-osi-left="p1" :mp-osi-right="p2" />
  </InstrumentTestbed>
</template>
