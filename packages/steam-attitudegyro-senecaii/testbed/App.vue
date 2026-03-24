<script setup lang="ts">
import { ref } from 'vue';
import AttitudeIndicator from '@instrument/AttitudeIndicator.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(0);
const p4 = ref(0);
const p5 = ref(0);
const p6 = ref(0);
const p7 = ref(0);
const p8 = ref(0);
const p9 = ref(0);
const p10 = ref(0);
const p11 = ref(0);
const p12 = ref(0);

const items: TestbedControlItem[] = [
  { name: 'Pitch', min: -90, max: 90, step: 0.2, ref: p1 },
  { name: 'Roll', min: -180, max: 180, step: 0.2, ref: p2 },
  { name: 'Gear', min: 0, max: 1, step: 1, ref: p4 },
  { name: 'GS', min: 0, max: 1, step: 1, ref: p5 },
  { name: 'FPLeft', min: 0, max: 1, step: 1, ref: p6 },
  { name: 'FPRight', min: 0, max: 1, step: 1, ref: p7 },
  { name: 'OIL', min: 0, max: 1, step: 1, ref: p8 },
  { name: 'Gyro', min: 0, max: 1, step: 1, ref: p9 },
  { name: 'OVRLeft', min: 0, max: 1, step: 1, ref: p10 },
  { name: 'OVRRight', min: 0, max: 1, step: 1, ref: p11 },
  { name: 'ALTN', min: 0, max: 1, step: 1, ref: p12 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <AttitudeIndicator
      class="gauge"
      :pitch-deg="p1"
      :roll-deg="p2"
      :gear-light="p4 > 0.5"
      :gs-light="p5 > 0.5"
      :fp-light1="p6 > 0.5"
      :fp-light2="p7 > 0.5"
      :oil-light="p8 > 0.5"
      :gyro-light1="p9 > 0.5"
      :gyro-light2="p9 > 0.5"
      :ovr-light1="p10 > 0.5"
      :ovr-light2="p11 > 0.5"
      :altn-light="p12 > 0.5"
    />
  </InstrumentTestbed>
</template>
