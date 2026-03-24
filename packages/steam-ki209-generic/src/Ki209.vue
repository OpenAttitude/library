<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Compass from './compass.svg';
import Static from './static.svg';
import Flag from './flag.svg';
import Yellow from './yellow-arrow.svg';

const props = defineProps<{
  selectedObsDeg?: number | null;
  headingNeedleDeflectionNorm?: number | null;
  gsNeedleDeflectionNorm?: number | null;
  toFlagNorm?: number | null;
  fromFlagNorm?: number | null;
  hasGlideslope?: boolean | null;
  gsInRange?: boolean | null;
  signalQualityNorm?: number | null;
  navDataValid?: boolean | null;
}>();

const valid = computed(() => !!props.navDataValid);

const headingTransform = computed(() => `rotate(${-(props.selectedObsDeg ?? 0)} 250 250)`);

const cdiTransform = computed(() => {
  const x = valid.value
    ? 10 * Math.clamp((props.headingNeedleDeflectionNorm ?? 0) * 11, -110, 110)
    : 0;
  return `translate(${x} 0)`;
});

const gdiTransform = computed(() => {
  const y = valid.value ? -Math.clamp((props.gsNeedleDeflectionNorm ?? 0) * 110, -110, 110) : 0;
  return `translate(0 ${y})`;
});

const toFlagTransform = computed(() => {
  const v = valid.value ? Math.clamp(props.toFlagNorm ?? 0, 0, 1) * 28 : 0;
  return `translate(0 ${-v})`;
});

const fromFlagTransform = computed(() => {
  const v = valid.value ? Math.clamp(props.fromFlagNorm ?? 0, 0, 1) * 28 : 0;
  return `translate(0 ${v})`;
});

const showGsFlag = computed(
  () => !(props.gsInRange && props.hasGlideslope && props.navDataValid),
);
const showNavFlag = computed(
  () => (props.signalQualityNorm ?? 0) < 0.5 || !props.navDataValid,
);
const showTo = computed(() => (props.toFlagNorm ?? 0) >= 0.1);
const showFrom = computed(() => (props.fromFlagNorm ?? 0) >= 0.1);
</script>
<template>
  <svg width="500" height="500" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
    <PrerenderedSvgImage :href="Compass" :transform="headingTransform" />
    <path v-if="showTo" id="TOFlag" d="m 200,230 15,28 h -30 z" style="fill: #ffffff" :transform="toFlagTransform" />
    <path
      v-if="showFrom"
      id="FROMFlag"
      d="m 200,270 -15,-28 h 30 z"
      style="fill: #ffffff"
      :transform="fromFlagTransform"
    />
    <rect x="185" y="230" width="30" height="40" style="fill: #000000" />
    <PrerenderedSvgImage :href="Static" />
    <PrerenderedSvgImage v-if="showGsFlag" :href="Flag" x="320" width="42" y="210" />
    <PrerenderedSvgImage v-if="showNavFlag" :href="Flag" x="229" width="42" y="370" />
    <PrerenderedSvgImage :href="Yellow" x="227.5" y="52" />

    <rect id="gdi" style="fill: white; stroke: none" x="100" y="246" height="8" width="300" :transform="gdiTransform" />
    <rect id="cdi" style="fill: white; stroke: none" y="100" x="246" height="300" width="8" :transform="cdiTransform" />
  </svg>
</template>
