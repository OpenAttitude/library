<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import NeedleL from './needle_l.svg';
import NeedleR from './needle_r.svg';

const TABLE: [number, number][] = [
  [0, -120],
  [10, -105],
  [50, 105],
  [90, 120],
];

const w = 500;
const h = 500;
const cx = w / 2;
const cy = h / 2;

const props = withDefaults(
  defineProps<{
    /** Manifold pressure (inHg OSI), left / engine 0, FG `mp-osi`. */
    mpOsiLeft?: number | null;
    mpOsiRight?: number | null;
  }>(),
  {
    mpOsiLeft: null,
    mpOsiRight: null,
  },
);

const needleRTransform = computed(() => {
  const val = Math.interpolate(props.mpOsiRight ?? 0, TABLE);
  return `rotate(${val} ${cx} ${cy})`;
});
const needleLTransform = computed(() => {
  const val = Math.interpolate(props.mpOsiLeft ?? 0, TABLE);
  return `rotate(${val} ${cx} ${cy})`;
});
</script>

<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    id="mp"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :href="Face" />
    <PrerenderedSvgImage :href="NeedleL" :transform="needleLTransform" />
    <PrerenderedSvgImage :href="NeedleR" :transform="needleRTransform" />
  </svg>
</template>
