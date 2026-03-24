<script setup lang="ts">
import { computed, ref } from 'vue';
import Ki525 from '@instrument/Ki525.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const heading = ref(45);
const course = ref(90);
const cdi = ref(0);
const gs = ref(0);
const navFlag = ref(0);
const hdgFlag = ref(1);
const hdgbug = ref(30);
const toF = ref(0);
const fromF = ref(0);
const hasGsN = ref(1);
const gsRangeN = ref(0);
const validN = ref(1);

const hasGs = computed(() => hasGsN.value > 0.5);
const gsInRange = computed(() => gsRangeN.value > 0.5);
const navValid = computed(() => validN.value > 0.5);

const items: TestbedControlItem[] = [
  { name: 'Heading °', min: 0, max: 360, step: 1, ref: heading },
  { name: 'Course °', min: 0, max: 360, step: 1, ref: course },
  { name: 'CDI', min: -10, max: 10, step: 0.1, ref: cdi },
  { name: 'GS', min: -2, max: 2, step: 0.05, ref: gs },
  { name: 'Nav flag', min: 0, max: 1, step: 0.05, ref: navFlag },
  { name: 'Hdg flag', min: 0, max: 1, step: 0.05, ref: hdgFlag },
  { name: 'Hdg bug °', min: 0, max: 360, step: 1, ref: hdgbug },
  { name: 'TO', min: 0, max: 1, step: 0.05, ref: toF },
  { name: 'FROM', min: 0, max: 1, step: 0.05, ref: fromF },
  { name: 'Has GS (0/1)', min: 0, max: 1, step: 1, ref: hasGsN },
  { name: 'GS range (0/1)', min: 0, max: 1, step: 1, ref: gsRangeN },
  { name: 'Nav valid (0/1)', min: 0, max: 1, step: 1, ref: validN },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <Ki525
      class="gauge"
      :indicated-heading-deg="heading"
      :selected-course-deg="course"
      :cdi-deflection="cdi"
      :gs-deflection="gs"
      :nav-flag-norm="navFlag"
      :heading-flag-norm="hdgFlag"
      :selected-heading-deg="hdgbug"
      :to-flag-norm="toF"
      :from-flag-norm="fromF"
      :has-glideslope="hasGs"
      :gs-in-range="gsInRange"
      :nav-data-valid="navValid"
    />
  </InstrumentTestbed>
</template>
