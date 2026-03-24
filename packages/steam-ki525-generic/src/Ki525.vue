<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import compass from './compass.svg';
import hdgflag from './hdgflag.svg';
import navflag from './navflag.svg';
import frame1 from './frame1.svg';
import frame2 from './frame2.svg';
import hdgbugImg from './hdgbug.svg';
import glideslope from './glideslope.svg';
import cdimarker from './cdimarker.svg';

const props = defineProps<{
  indicatedHeadingDeg?: number | null;
  selectedCourseDeg?: number | null;
  cdiDeflection?: number | null;
  gsDeflection?: number | null;
  navFlagNorm?: number | null;
  headingFlagNorm?: number | null;
  selectedHeadingDeg?: number | null;
  toFlagNorm?: number | null;
  fromFlagNorm?: number | null;
  hasGlideslope?: boolean | null;
  gsInRange?: boolean | null;
  navDataValid?: boolean | null;
}>();

const compassTransform = computed(() => {
  const v = -(props.indicatedHeadingDeg ?? 0);
  return `rotate(${v} 250 250)`;
});

const hdgbugTransform = computed(() => {
  const v = (props.selectedHeadingDeg ?? 0) - (props.indicatedHeadingDeg ?? 0);
  return `rotate(${v} 250 250)`;
});

const courseTransform = computed(() => {
  const v = (props.selectedCourseDeg ?? 0) - (props.indicatedHeadingDeg ?? 0);
  return `rotate(${v} 250 250)`;
});

const cdiTransform = computed(() => {
  const v = props.navDataValid ? Math.clamp(props.cdiDeflection ?? 0, -10, 10) * 5 * (22 / 10) : 0;
  return `translate(${v} 0)`;
});

const navflagTransform = computed(() => {
  const v = props.navDataValid ? Math.clamp(props.navFlagNorm ?? 0, 0, 1) * 20 : 0;
  return `rotate(${-v} 50 64)`;
});

const hdgflagTransform = computed(() => {
  const v = (1 - Math.clamp(props.headingFlagNorm ?? 0, 0, 1)) * 20;
  return `rotate(${v} 450 64)`;
});

const gsTransform = computed(() => {
  const v = Math.clamp(props.gsDeflection ?? 0, -2, 2) * -100;
  return `translate(0 ${v})`;
});

const toFlagTransform = computed(() => {
  const v = props.navDataValid ? Math.clamp(props.toFlagNorm ?? 0, 0, 1) * 28 : 0;
  return `translate(0 ${-v})`;
});

const fromFlagTransform = computed(() => {
  const v = props.navDataValid ? Math.clamp(props.fromFlagNorm ?? 0, 0, 1) * 28 : 0;
  return `translate(0 ${v})`;
});

const showGlideslope = computed(
  () => !!(props.hasGlideslope && props.gsInRange && props.navDataValid),
);
const showHdgFlag = computed(() => (props.headingFlagNorm ?? 0) > 0.01);
const showTo = computed(() => (props.toFlagNorm ?? 0) >= 0.1);
const showFrom = computed(() => (props.fromFlagNorm ?? 0) >= 0.1);
</script>
<template>
  <svg viewBox="0 0 500 500" width="500" height="500" preserveAspectRatio="xMinYMin meet">
    <PrerenderedSvgImage :href="compass" :transform="compassTransform" />
    <PrerenderedSvgImage :href="hdgbugImg" :transform="hdgbugTransform" />
    <PrerenderedSvgImage v-if="showHdgFlag" :href="hdgflag" :transform="hdgflagTransform" />
    <PrerenderedSvgImage :href="navflag" :transform="navflagTransform" />
    <PrerenderedSvgImage :href="frame1" />
    <PrerenderedSvgImage v-if="showGlideslope" :href="glideslope" :transform="gsTransform" />
    <g :transform="courseTransform">
      <circle style="fill: #000000" cx="250" cy="250" r="150" />
      <path
        style="fill: #fcf300"
        d="m 247.5,345 h 5 v 56.03677 L 250,410 247.5,401.03677 Z M 250,90 236,115 h 11.5 v 40 h 5 V 115 H 264 Z"
      />
      <path v-if="showTo" id="TOFlag" d="m 250,236 15,28 h -30 z" style="fill: #ffffff" :transform="toFlagTransform" />
      <path
        v-if="showFrom"
        id="FROMFlag"
        d="m 250,264 -15,-28 h 30 z"
        style="fill: #ffffff"
        :transform="fromFlagTransform"
      />
      <PrerenderedSvgImage :href="cdimarker" />
      <path style="fill: #fcf300" d="m 247.5,160 h 5 v 180 h -5 z" :transform="cdiTransform" />
    </g>
    <PrerenderedSvgImage :href="frame2" />
  </svg>
</template>
