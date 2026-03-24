<script setup lang="ts">
import { ref } from 'vue';
import FlapIndicator from '@instrument/FlapIndicator.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(0);
const p2 = ref(0);
const items: TestbedControlItem[] = [
  { name: 'Flap', min: 0, max: 1, step: 0.01, ref: p1 },
  { name: 'Trim', min: -1, max: 1, step: 0.01, ref: p2 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <FlapIndicator class="gauge" :flaps-norm="p1" :trim-norm="p2" />
  </InstrumentTestbed>
</template>
