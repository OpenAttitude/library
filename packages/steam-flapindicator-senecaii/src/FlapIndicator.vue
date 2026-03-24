<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Needle from './needle.svg';

const props = withDefaults(
  defineProps<{
    /** Normalized flap position 0–1, FG `flap-pos-norm`. */
    flapsNorm?: number | null;
    /** Normalized elevator trim, FG `elevator-trim`. */
    trimNorm?: number | null;
  }>(),
  {
    flapsNorm: null,
    trimNorm: null,
  },
);

const needleTransform = computed(() => {
  const val = (props.flapsNorm ?? 0) * 80 - 40;
  return `translate(145 250) rotate(${val}) translate(-7.5 -7.5)`;
});

const trimTransform = computed(() => {
  const val = Math.clamp((props.trimNorm ?? 0) * 80 * -2, -80, 80);
  return `translate(0 ${val})`;
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
    <circle cx="145" cy="250" r="35" fill="black" />
    <rect x="30" y="245" width="50" height="10" fill="white" :transform="trimTransform" />
  </svg>
</template>
