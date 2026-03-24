<script setup lang="ts">
import { computed } from 'vue';
import { PrerenderedSvgImage } from '@openattitude/core';
import Setting from './setting.svg';
import Face from './face.svg';
import TenThousand from './10k.svg';

/* Kollsman window ~946–1050 mbar; transform matches original fgpanel altimeter. */
const props = withDefaults(
  defineProps<{
    /** Indicated altitude (feet). */
    indicatedAltitudeFt?: number | null;
    /** Barometric setting (hPa / mbar), FG `setting-hpa`. */
    settingHpa?: number | null;
  }>(),
  {
    indicatedAltitudeFt: null,
    settingHpa: null,
  },
);

const altFt = computed(() => props.indicatedAltitudeFt ?? 0);

const get10kTransform = computed(() => {
  const v = altFt.value / 10000;
  return `rotate(${v * 36} 250 250)`;
});

const get1kTransform = computed(() => {
  const v = altFt.value / 1000;
  return `rotate(${v * 36} 250 250)`;
});

const get100Transform = computed(() => {
  const v = altFt.value / 100;
  return `rotate(${v * 36} 250 250)`;
});

const getSettingTransform = computed(() => {
  /* Same as fgpanel: clamp setting; null coerces like unref(null) in Math.min/max chain → 0. */
  const s = props.settingHpa == null ? 0 : props.settingHpa;
  const v = (1015 - Math.clamp(s, -945, 1050)) * 3.0;
  return `rotate(${v} 250 250)`;
});
</script>

<template>
  <svg
    width="500"
    height="500"
    viewBox="0 0 500 500"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <PrerenderedSvgImage :transform="getSettingTransform" :href="Setting" />
    <g id="altimeter">
      <PrerenderedSvgImage :href="Face" />
      <PrerenderedSvgImage :href="TenThousand" :transform="get10kTransform" />
      <path
        id="rect157"
        style="fill:#ffffff;stroke:#dcdcdc;"
        d="M 240.46,55.03 250,26.41 259.54,55.03 V 214.98 H 240.46 Z"
        :transform="get100Transform"
      />
      <path
        id="path157"
        style="fill:#ffffff;stroke:#dcdcdc;"
        d="m 230.46,143.81 19.54,-28.62 19.54,28.61 -10,71.17 h -19.08 z"
        :transform="get1kTransform"
      />
    </g>
  </svg>
</template>
