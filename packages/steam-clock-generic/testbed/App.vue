<script setup lang="ts">
import { ref } from 'vue';
import GenericClock from '@instrument/GenericClock.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const seconds = ref(0);

const items: TestbedControlItem[] = [
  {
    name: 'Seconds',
    min: 0,
    max: 86400,
    step: 1,
    ref: seconds,
  },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <GenericClock class="gauge" :utc-day-seconds="seconds" />
  </InstrumentTestbed>
</template>
