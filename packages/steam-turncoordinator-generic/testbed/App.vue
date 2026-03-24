<script setup lang="ts">
import { ref } from 'vue';
import TurnCoordinator from '@instrument/TurnCoordinator.vue';
import InstrumentTestbed from './lib/InstrumentTestbed.vue';
import type { TestbedControlItem } from './lib/types';

const turnRate = ref(0);
const slip = ref(0);
const items: TestbedControlItem[] = [
  { name: 'Turn rate', min: -2, max: 2, step: 0.01, ref: turnRate },
  { name: 'Slip/skid', min: -2, max: 2, step: 0.01, ref: slip },
];
</script>

<template>
  <InstrumentTestbed :items="items">
    <TurnCoordinator class="gauge" :indicated-turn-rate="turnRate" :indicated-slip-skid="slip" />
  </InstrumentTestbed>
</template>
