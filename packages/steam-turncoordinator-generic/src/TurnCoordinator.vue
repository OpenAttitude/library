<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Face from './face.svg';
import Becel from './becel.svg';
import Airplane from './airplane.svg';

const props = defineProps<{
  indicatedTurnRate?: number | null;
  indicatedSlipSkid?: number | null;
}>();

const getROTTransform = computed(() => {
  const v = Math.clamp((props.indicatedTurnRate ?? 0) * 20, -40, 40);
  return `rotate(${v} 250 263) `;
});

const getBallTransform = computed(() => {
  const angle = Math.clamp(5.729 * (props.indicatedSlipSkid ?? 0), -13.6, 13.6);
  return `rotate( ${angle} 250 -240)`;
});
</script>
<template>
  <svg width="500" height="500" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
    <PrerenderedSvgImage :href="Face" />
    <circle id="ball" cx="250" cy="354" r="22" style="stroke: none; fill: black" :transform="getBallTransform" />
    <PrerenderedSvgImage :href="Becel" />
    <PrerenderedSvgImage :href="Airplane" :transform="getROTTransform" />
  </svg>
</template>
