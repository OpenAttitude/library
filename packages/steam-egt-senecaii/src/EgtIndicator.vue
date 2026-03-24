<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Needle from './needle.svg';
import Becel from './becel.svg';

const EGT_TABLE: [number, number][] = [
  [1200, -45],
  [1700, 45],
];

const props = withDefaults(
  defineProps<{
    /** Exhaust gas temperature (°F), FG `egt-degf`. */
    egtDegF?: number | null;
  }>(),
  { egtDegF: null },
);

const needleTransform = computed(() => {
  const val = Math.interpolate(props.egtDegF ?? 0, EGT_TABLE);
  return `rotate(${val} 250 350)`;
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
    <PrerenderedSvgImage :href="Needle" :transform="needleTransform" />
    <PrerenderedSvgImage :href="Becel" />
  </svg>
</template>
