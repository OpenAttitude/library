<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { TestbedControlItem } from './types';

const props = defineProps<{
  item: TestbedControlItem;
}>();

const v = computed({
  get: () => props.item.ref.value,
  set: (n: number) => {
    props.item.ref.value = n;
  },
});

const min = ref(props.item.min);
const max = ref(props.item.max);
const step = ref(props.item.step);

watch(
  () => props.item.min,
  (m) => {
    min.value = m;
  },
);
watch(
  () => props.item.max,
  (m) => {
    max.value = m;
  },
);
watch(
  () => props.item.step,
  (s) => {
    step.value = s;
  },
);
</script>

<template>
  <div class="property-control">
    <div class="property-control__row">
      <span class="property-control__label">{{ item.name }}</span>
      <input v-model.number="v" type="number" class="property-control__number" />
    </div>
    <input
      v-model.number="v"
      type="range"
      class="property-control__range"
      :min="min"
      :max="max"
      :step="step"
    />
    <details class="property-control__advanced">
      <summary>Range</summary>
      <label>Min <input v-model.number="min" type="number" class="property-control__number" /></label>
      <label>Max <input v-model.number="max" type="number" class="property-control__number" /></label>
      <label>Step <input v-model.number="step" type="number" class="property-control__number" /></label>
    </details>
  </div>
</template>

<style scoped>
.property-control {
  padding: 0.35rem 0;
  border-bottom: 1px solid #ccc;
}

.property-control__row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.property-control__label {
  flex: 0 0 5.5rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.property-control__number {
  width: 4.5rem;
  font-size: 0.8rem;
}

.property-control__range {
  width: 100%;
}

.property-control__advanced {
  margin-top: 0.35rem;
  font-size: 0.75rem;
}

.property-control__advanced label {
  display: block;
  margin-top: 0.25rem;
}
</style>
