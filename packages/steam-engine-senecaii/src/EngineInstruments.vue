<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';

const ALT_T: [number, number][] = [
  [-70, 30],
  [0, -30],
];
const CHT_T: [number, number][] = [
  [200, -30],
  [460, 30],
];
const OT_T: [number, number][] = [
  [75, -30],
  [240, 30],
];
const OP_T: [number, number][] = [
  [10, -30],
  [100, 30],
];
const FUEL_T: [number, number][] = [
  [0, -30],
  [60, 30],
];

const props = withDefaults(
  defineProps<{
    /** Electrical bus load (A), FG `.../bus/element[n]/i`. */
    busCurrentA?: number | null;
    chtDegF?: number | null;
    oilTempDegF?: number | null;
    oilPressurePsi?: number | null;
    fuelLevelGalUs?: number | null;
  }>(),
  {
    busCurrentA: null,
    chtDegF: null,
    oilTempDegF: null,
    oilPressurePsi: null,
    fuelLevelGalUs: null,
  },
);

const altTransform = computed(() => {
  const val = Math.interpolate(props.busCurrentA ?? 0, ALT_T);
  return `rotate(${val} 116.672 175)`;
});
const chtTransform = computed(() => {
  const val = Math.interpolate(props.chtDegF ?? 0, CHT_T);
  return `rotate(${val} 333 175)`;
});
const otTransform = computed(() => {
  const val = Math.interpolate(props.oilTempDegF ?? 0, OT_T);
  return `rotate(${val} 545 175)`;
});
const opTransform = computed(() => {
  const val = Math.interpolate(props.oilPressurePsi ?? 0, OP_T);
  return `rotate(${val} 760 175)`;
});
const fuelTransform = computed(() => {
  const val = Math.interpolate(props.fuelLevelGalUs ?? 0, FUEL_T);
  return `rotate(${val} 975 175)`;
});
</script>

<template>
  <svg
    width="1100"
    height="128"
    viewBox="0 0 1100 128"
    preserveAspectRatio="xMinYMin meet"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :href="Face" />
    <rect
      style="fill:#ffffff"
      width="6.2719936"
      height="120.98956"
      x="117.1722"
      y="22.150343"
      :transform="altTransform"
    />
    <rect
      style="fill:#ffffff"
      width="6.2719936"
      height="120.98956"
      x="333.52679"
      y="22.150343"
      :transform="chtTransform"
    />
    <rect
      style="fill:#ffffff"
      width="6.2719936"
      height="120.98956"
      x="545"
      y="22.150343"
      :transform="otTransform"
    />
    <rect
      style="fill:#ffffff"
      width="6.2719936"
      height="120.98956"
      x="760"
      y="22.150343"
      :transform="opTransform"
    />
    <rect
      style="fill:#ffffff"
      width="6.2719936"
      height="120.98956"
      x="975"
      y="22.150343"
      :transform="fuelTransform"
    />
  </svg>
</template>
