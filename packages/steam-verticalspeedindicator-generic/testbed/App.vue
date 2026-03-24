<script setup lang="ts">
import { ref } from 'vue';
import VerticalSpeedIndicator from '@instrument/VerticalSpeedIndicator.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const fpm = ref(0);
const items: TestbedControlItem[] = [
  { name: 'VS (fpm)', min: -2000, max: 2000, step: 10, ref: fpm },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <VerticalSpeedIndicator class="gauge" :vertical-speed-fpm="fpm" />
  </InstrumentTestbed>
</template>
