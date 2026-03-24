<script setup lang="ts">
import type { TestbedControlItem } from './types';
import PropertyControl from './PropertyControl.vue';

defineProps<{
  items: TestbedControlItem[];
}>();
</script>

<template>
  <div class="instrument-testbed">
    <aside class="instrument-testbed__sidebar">
      <PropertyControl v-for="p in items" :key="p.name" :item="p" />
    </aside>
    <main class="instrument-testbed__stage">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.instrument-testbed {
  display: flex;
  min-height: 100vh;
  align-items: stretch;
}

.instrument-testbed__sidebar {
  flex: 0 0 14rem;
  max-width: 18rem;
  overflow-y: auto;
  padding: 0.5rem 0.75rem;
  background: #f4f4f4;
  border-right: 1px solid #bbb;
}

.instrument-testbed__stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: aliceblue;
}

:deep(.gauge) {
  max-width: 100%;
  max-height: 100%;
}
</style>
