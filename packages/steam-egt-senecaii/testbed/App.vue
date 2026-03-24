<script setup lang="ts">
import { ref } from 'vue';
import EgtIndicator from '@instrument/EgtIndicator.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(1200);
const items: TestbedControlItem[] = [
  { name: 'EGT', min: 1000, max: 1800, step: 5, ref: p1 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <EgtIndicator class="gauge" :egt-deg-f="p1" />
  </InstrumentTestbed>
</template>
