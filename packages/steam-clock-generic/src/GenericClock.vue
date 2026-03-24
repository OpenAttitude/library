<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Hour from './hour.svg';
import Minute from './minute.svg';
import Second from './second.svg';

const props = withDefaults(
  defineProps<{
    /** Seconds since UTC midnight (FG `/sim/time/utc/day-seconds`). */
    utcDaySeconds?: number | null;
  }>(),
  {
    utcDaySeconds: null,
  },
);

const sec = computed(() => props.utcDaySeconds ?? 0);

const getSTransform = computed(() => {
  const v = sec.value;
  return `rotate(${v * 6} 250 250)`;
});

const getMTransform = computed(() => {
  const v = sec.value;
  return `rotate(${v / 10} 250 250)`;
});

const getHTransform = computed(() => {
  const v = sec.value;
  return `rotate(${(v / 720) * 6} 250 250)`;
});
</script>

<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :href="Face" />
    <PrerenderedSvgImage :href="Hour" :transform="getHTransform" />
    <PrerenderedSvgImage :href="Minute" :transform="getMTransform" />
    <PrerenderedSvgImage :href="Second" :transform="getSTransform" />
  </svg>
</template>
