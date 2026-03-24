<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Redlight from './redlight.svg';
import Needle from './needle.svg';

const TABLE: [number, number][] = [
  [0, -85],
  [3.5, -45],
  [6.5, 45],
  [8.0, 85],
];

const props = withDefaults(
  defineProps<{
    /** Suction (inHg), FG `suction-inhg`. */
    suctionInHg?: number | null;
    vacuumInoperativeLeft?: boolean;
    vacuumInoperativeRight?: boolean;
  }>(),
  {
    suctionInHg: null,
    vacuumInoperativeLeft: false,
    vacuumInoperativeRight: false,
  },
);

const needleTransform = computed(() => {
  const val = Math.interpolate(props.suctionInHg ?? 0, TABLE);
  return `rotate(${val} 250 250)`;
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
    <PrerenderedSvgImage :href="Redlight" x="120" y="347" v-show="vacuumInoperativeLeft" />
    <PrerenderedSvgImage :href="Redlight" x="316" y="347" v-show="vacuumInoperativeRight" />
    <PrerenderedSvgImage :href="Needle" :transform="needleTransform" />
  </svg>
</template>
