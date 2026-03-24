<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';

const w = 500;
const h = 500;
const cx = w / 2;
const cy = h / 2;

const props = withDefaults(
  defineProps<{
    /** Engine speed (RPM), FG `rpm`. */
    rpm?: number | null;
  }>(),
  { rpm: null },
);

const needleTransform = computed(() => {
  const r = props.rpm ?? 0;
  const val = Math.clamp(((r - 300) * 256) / 3200 - 128, -128, 128);
  return `rotate(${val} ${cx} ${cy})`;
});
</script>

<template>
  <svg
    :viewBox="`0 0 ${w} ${h}`"
    width="500"
    height="500"
    preserveAspectRatio="xMinYMin meet"
    xmlns="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :href="Face" />
    <g :transform="needleTransform">
      <path
        style="stroke:none;fill:white"
        transform="translate(250 0)"
        d="M 0 30 L 10 250 h -20 z" />
    </g>
  </svg>
</template>
