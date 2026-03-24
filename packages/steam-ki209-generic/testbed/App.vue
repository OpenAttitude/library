<script setup lang="ts">
import { computed, ref } from 'vue';
import Ki209 from '@instrument/Ki209.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const obs = ref(0);
const cdi = ref(0);
const gdi = ref(0);
const toF = ref(0);
const fromF = ref(0);
const sig = ref(1);
const hasGsN = ref(1);
const gsRangeN = ref(0);
const validN = ref(1);

const hasGs = computed(() => hasGsN.value > 0.5);
const gsInRange = computed(() => gsRangeN.value > 0.5);
const navValid = computed(() => validN.value > 0.5);

const items: TestbedControlItem[] = [
  { name: 'OBS °', min: 0, max: 360, step: 1, ref: obs },
  { name: 'CDI norm', min: -1, max: 1, step: 0.01, ref: cdi },
  { name: 'GS norm', min: -1, max: 1, step: 0.01, ref: gdi },
  { name: 'TO flag', min: 0, max: 1, step: 0.05, ref: toF },
  { name: 'FROM flag', min: 0, max: 1, step: 0.05, ref: fromF },
  { name: 'Signal Q', min: 0, max: 1, step: 0.05, ref: sig },
  { name: 'Has GS (0/1)', min: 0, max: 1, step: 1, ref: hasGsN },
  { name: 'GS range (0/1)', min: 0, max: 1, step: 1, ref: gsRangeN },
  { name: 'Nav valid (0/1)', min: 0, max: 1, step: 1, ref: validN },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <Ki209
      class="gauge"
      :selected-obs-deg="obs"
      :heading-needle-deflection-norm="cdi"
      :gs-needle-deflection-norm="gdi"
      :to-flag-norm="toF"
      :from-flag-norm="fromF"
      :has-glideslope="hasGs"
      :gs-in-range="gsInRange"
      :signal-quality-norm="sig"
      :nav-data-valid="navValid"
    />
  </InstrumentTestbed>
</template>
