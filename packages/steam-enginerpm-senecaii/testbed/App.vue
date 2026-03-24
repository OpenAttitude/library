<script setup lang="ts">
import { ref } from 'vue';
import EngineRpmGauge from '@instrument/EngineRpmGauge.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const p1 = ref(1200);
const items: TestbedControlItem[] = [
  { name: 'RPM', min: 0, max: 3500, step: 10, ref: p1 },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <EngineRpmGauge class="gauge" :rpm="p1" />
  </InstrumentTestbed>
</template>
