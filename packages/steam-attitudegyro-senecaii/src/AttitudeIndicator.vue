<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import AnnunciatorLight from './AnnunciatorLight.vue';
import Backface from './backface.svg';
import Pitch from './pitch.svg';
import Becel from './becel.svg';
import Marker from './marker.svg';

const props = withDefaults(
  defineProps<{
    pitchDeg?: number | null;
    rollDeg?: number | null;
    gearLight?: boolean;
    gsLight?: boolean;
    ovrLight1?: boolean;
    ovrLight2?: boolean;
    fpLight1?: boolean;
    fpLight2?: boolean;
    oilLight?: boolean;
    gyroLight1?: boolean;
    gyroLight2?: boolean;
    altnLight?: boolean;
  }>(),
  {
    pitchDeg: null,
    rollDeg: null,
    gearLight: false,
    gsLight: false,
    ovrLight1: false,
    ovrLight2: false,
    fpLight1: false,
    fpLight2: false,
    oilLight: false,
    gyroLight1: false,
    gyroLight2: false,
    altnLight: false,
  },
);

const gyroLight = computed(() => !!(props.gyroLight1 || props.gyroLight2));

function pitchToY(pitchDeg: number): number {
  return Math.clamp(pitchDeg, -19, 19) * 5;
}

const pitchTransform = computed(() => {
  return `translate(0 ${pitchToY(props.pitchDeg ?? 0)})`;
});

const rollTransform = computed(() => {
  return `rotate(${-(props.rollDeg ?? 0)} 250 250)`;
});
</script>

<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    preserveAspectRatio="xMinYMin meet"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <g id="roll" :transform="rollTransform">
      <PrerenderedSvgImage :href="Backface" />
      <PrerenderedSvgImage :href="Pitch" :transform="pitchTransform" />
      <PrerenderedSvgImage :href="Becel" />
    </g>
    <PrerenderedSvgImage :href="Marker" />
    <AnnunciatorLight x="251" y="455" height="35" width="35" text="Gear" v-show="gearLight" />
    <AnnunciatorLight x="214" y="455" height="35" width="35" text="GS" color="green" v-show="gsLight" />

    <AnnunciatorLight x="178" y="451" height="35" width="35" text="OVR" color="#f0c416" v-show="ovrLight1" />
    <AnnunciatorLight x="287" y="451" height="35" width="35" text="OVR" color="#f0c416" v-show="ovrLight2" />

    <AnnunciatorLight x="142" y="440" height="35" width="35" text="FP" color="#fd7500" v-show="fpLight1" />
    <AnnunciatorLight x="323" y="440" height="35" width="35" text="FP" color="#fd7500" v-show="fpLight2" />

    <AnnunciatorLight x="106" y="419" height="35" width="35" text="Gyro" color="#221f13" v-show="gyroLight" />
    <AnnunciatorLight x="359" y="419" height="35" width="35" text="OIL" color="#221f13" v-show="oilLight" />
    <AnnunciatorLight x="395" y="387" height="35" width="35" text="ALT" color="#221f13" v-show="altnLight" />
  </svg>
</template>
