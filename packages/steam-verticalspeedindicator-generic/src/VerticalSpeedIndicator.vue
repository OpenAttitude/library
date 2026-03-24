<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';

const VSI_TABLE: [number, number][] = [
  [-2000, -173],
  [-1500, -130],
  [-1000, -80],
  [-500, -35],
  [0, 0],
  [500, 35],
  [1000, 80],
  [1500, 130],
  [2000, 173],
];

const props = defineProps<{
  verticalSpeedFpm?: number | null;
}>();

const needleTransform = computed(() => {
  const a = Math.interpolate(props.verticalSpeedFpm ?? 0, VSI_TABLE);
  return `rotate(${a} 250 250)`;
});
</script>
<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >
    <PrerenderedSvgImage :href="Face" />
    <g :transform="needleTransform">
      <path
        style="stroke: #717171; stroke-width: 1"
        d="M 334.39,236.02 A 14.8,13.98 0 0 0 324.11,240 H 257.83 A 12.73,12.73 0 0 0 250,237.27 12.73,12.73 0 0 0 242.17,240 h -22.13 v 20 h 22.13 a 12.73,12.73 0 0 0 7.83,2.73 12.73,12.73 0 0 0 7.83,-2.73 h 66.28 a 14.8,13.98 0 0 0 10.28,3.98 A 14.8,13.98 0 0 0 349.2,250 14.8,13.98 0 0 0 334.39,236.02 Z"
      />
      <path
        style="fill: #ffffff; stroke: #717171; stroke-width: 1"
        d="M 55.15,240 H 220.9 v 20 H 55.15 L 32.06,250 Z"
      />
    </g>
  </svg>
</template>
