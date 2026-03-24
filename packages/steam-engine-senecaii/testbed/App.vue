<script setup lang="ts">
import { ref } from 'vue';
import EngineInstruments from '@instrument/EngineInstruments.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(200);
const p3 = ref(75);
const p4 = ref(10);
const p5 = ref(0);

const items: TestbedControlItem[] = [
  { name: 'ALT', min: -80, max: 10, step: 1, ref: p1 },
  { name: 'CHT', min: 150, max: 500, step: 5, ref: p2 },
  { name: 'OT', min: 70, max: 250, step: 5, ref: p3 },
  { name: 'OP', min: 0, max: 120, step: 5, ref: p4 },
  { name: 'Fuel', min: 0, max: 70, step: 1, ref: p5 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <EngineInstruments
      class="cutout"
      :bus-current-a="p1"
      :cht-deg-f="p2"
      :oil-temp-deg-f="p3"
      :oil-pressure-psi="p4"
      :fuel-level-gal-us="p5"
    />
  </InstrumentTestbed>
</template>
