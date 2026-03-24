<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Pointer from './pointer.svg';
import Becel from './becel.svg';

const props = withDefaults(
  defineProps<{
    /** Relative bearing to station (degrees), FG `indicated-bearing-deg`. */
    indicatedBearingDeg?: number | null;
    /** Compass card rotation (degrees), FG `rotation-deg`. */
    cardHeadingDeg?: number | null;
  }>(),
  {
    indicatedBearingDeg: null,
    cardHeadingDeg: null,
  },
);

const headingTransform = computed(() => {
  const h = props.cardHeadingDeg ?? 0;
  return `rotate(${-h} 250 250)`;
});

const bearingTransform = computed(() => {
  const b = props.indicatedBearingDeg ?? 0;
  return `rotate(${b} 250 250)`;
});
</script>

<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    preserveAspectRatio="xMinYMin"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :href="Face" :transform="headingTransform" />
    <PrerenderedSvgImage :href="Pointer" :transform="bearingTransform" />
    <PrerenderedSvgImage :href="Becel" />
  </svg>
</template>
