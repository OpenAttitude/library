<script setup lang="ts">
defineProps<{
  text?: string;
  color?: string;
}>();
</script>

<template>
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    version="1.1"
    preserveAspectRatio="xMinYMin meet"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0"
      y="0"
      width="100"
      height="100"
      :fill="color ?? 'red'"
      stroke="#202020"
      stroke-width="3"
      rx="40"
      ry="40"
    />

    <text
      x="52"
      y="52"
      font-size="38"
      font-family="Arial"
      font-weight="bold"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="black"
      stroke="white"
      stroke-width="1"
      opacity="0.5"
    >{{ text ?? '' }}</text>
    <text
      x="50"
      y="50"
      font-size="38"
      font-family="Arial"
      font-weight="bold"
      text-anchor="middle"
      dominant-baseline="middle"
      fill="#c0c0c0"
      stroke="black"
      stroke-width="1"
      opacity="0.7"
    >{{ text ?? '' }}</text>
  </svg>
</template>
