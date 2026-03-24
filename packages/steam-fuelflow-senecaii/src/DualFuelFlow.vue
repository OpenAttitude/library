<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import NeedleL from './needle_l.svg';
import NeedleR from './needle_r.svg';

const FLOW_TABLE: [number, number][] = [
  [0, -210],
  [3, -180],
  [8, -143],
  [10, -130],
  [15, -81],
  [20, -18],
  [25, 80],
];

const props = withDefaults(
  defineProps<{
    /** Fuel flow (GPH), left/engine 0, FG `fuel-flow-gph`. */
    fuelFlowGphLeft?: number | null;
    fuelFlowGphRight?: number | null;
  }>(),
  {
    fuelFlowGphLeft: null,
    fuelFlowGphRight: null,
  },
);

const needleRTransform = computed(() => {
  const val = Math.interpolate(props.fuelFlowGphRight ?? 0, FLOW_TABLE);
  return `rotate(${val} 250 250)`;
});
const needleLTransform = computed(() => {
  const val = Math.interpolate(props.fuelFlowGphLeft ?? 0, FLOW_TABLE);
  return `rotate(${val} 250 250)`;
});
</script>

<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    id="svg1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :href="Face" />
    <PrerenderedSvgImage :href="NeedleL" :transform="needleLTransform" />
    <PrerenderedSvgImage :href="NeedleR" :transform="needleRTransform" />
  </svg>
</template>
