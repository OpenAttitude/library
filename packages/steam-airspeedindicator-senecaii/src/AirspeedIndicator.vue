<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import TAS from './tas.svg';
import IAS from './ias.svg';

const IAS_TO_NEEDLE_DEG: [number, number][] = [
  [0, 0],
  [40, 31],
  [50, 52],
  [60, 75],
  [70, 95],
  [80, 115],
  [90, 135],
  [100, 153],
  [110, 172],
  [120, 191],
  [130, 207],
  [140, 223],
  [150, 237],
  [160, 250],
  [170, 267],
  [180, 280],
  [190, 293],
  [195, 300],
  [200, 307],
  [205, 314],
  [230, 341],
];

const props = withDefaults(
  defineProps<{
    /** Indicated airspeed (knots). */
    indicatedSpeedKt?: number | null;
    /** TAS sub-face rotation (degrees), as from FG `tas-face-rotation`. */
    tasFaceRotationDeg?: number | null;
  }>(),
  {
    indicatedSpeedKt: null,
    tasFaceRotationDeg: null,
  },
);

const needleTransform = computed(() => {
  const kt = props.indicatedSpeedKt ?? 0;
  const angle = Math.interpolate(kt, IAS_TO_NEEDLE_DEG);
  return `rotate(${angle} 250 250)`;
});

const tasTransform = computed(() => {
  const deg = props.tasFaceRotationDeg ?? 0;
  return `rotate(${-deg} 250 250)`;
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
    <PrerenderedSvgImage :href="TAS" :transform="tasTransform" />
    <PrerenderedSvgImage :href="IAS" />
    <g :transform="needleTransform">
      <path
        d="m 250,20.49 -4.57,13.67 -0.01,83.19 -4.17,11.57 h -0.06 v 0.17 83.02 h 17.61 v -83.02 -0.17 h -0.06 l -4.14,-11.59 -0.04,-83.17 z"
        style="fill:#ffffff;stroke:#252525;stroke-width:1;"
      />
      <path
        d="m 241.19,211.89 v 22.93 a 17.61,17.58 0 0 0 -8.81,15.18 17.61,17.58 0 0 0 8.81,15.18 v 40.32 a 17.61,17.58 0 0 0 -8.81,15.18 17.61,17.58 0 0 0 17.62,17.58 17.61,17.58 0 0 0 17.62,-17.58 17.61,17.58 0 0 0 -8.81,-15.22 v -40.28 a 17.61,17.58 0 0 0 8.81,-15.18 17.61,17.58 0 0 0 -8.81,-15.22 v -22.89 z"
        style="stroke:#252525;stroke-width:1;"
      />
    </g>
  </svg>
</template>
