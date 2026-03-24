<script setup lang="ts">
import { ref, computed } from 'vue';
import GyroPressureGauge from '@instrument/GyroPressureGauge.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(4);
const p2 = ref(0);
const p3 = ref(0);
const items: TestbedControlItem[] = [
  { name: 'Suction', min: 0, max: 8, step: 0.05, ref: p1 },
  { name: 'InopL', min: 0, max: 1, step: 1, ref: p2 },
  { name: 'InopR', min: 0, max: 1, step: 1, ref: p3 },
];
const inopL = computed(() => p2.value > 0.5);
const inopR = computed(() => p3.value > 0.5);
</script>

<template>
  <InstrumentTestbed :items="items">
    <GyroPressureGauge
      class="gauge"
      :suction-in-hg="p1"
      :vacuum-inoperative-left="inopL"
      :vacuum-inoperative-right="inopR"
    />
  </InstrumentTestbed>
</template>
