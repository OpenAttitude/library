<script setup lang="ts">
import { ref, watch, onMounted, onActivated, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps<{
  href: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  transform?: string;
}>();

const imgHref = ref<string>();
const outW = ref<number>();
const outH = ref<number>();

const imageRef = ref<SVGImageElement | null>(null);

let cachedSrc: string | null = null;
let cachedImg: HTMLImageElement | null = null;
let resizeObserver: ResizeObserver | null = null;
let paintGen = 0;
let lastRasterKey = '';

const MAX_CANVAS = 8192;

function layoutDimensions(
  naturalW: number,
  naturalH: number,
): { w: number; h: number } {
  const pwRaw = props.width;
  const phRaw = props.height;
  const pw =
    pwRaw != null && pwRaw !== ''
      ? typeof pwRaw === 'number'
        ? pwRaw
        : Number(pwRaw)
      : undefined;
  const ph =
    phRaw != null && phRaw !== ''
      ? typeof phRaw === 'number'
        ? phRaw
        : Number(phRaw)
      : undefined;
  if (pw != null && ph != null) return { w: pw, h: ph };
  if (pw != null) return { w: pw, h: naturalH * (pw / naturalW) };
  if (ph != null) return { w: naturalW * (ph / naturalH), h: ph };
  return { w: naturalW, h: naturalH };
}

async function loadSource(): Promise<HTMLImageElement> {
  if (cachedImg && cachedSrc === props.href) return cachedImg;
  const img = new Image();
  img.src = props.href;
  await img.decode();
  cachedSrc = props.href;
  cachedImg = img;
  return img;
}

async function paint(): Promise<void> {
  const gen = ++paintGen;
  if (!props.href) {
    imgHref.value = undefined;
    return;
  }

  let source: HTMLImageElement;
  try {
    source = await loadSource();
  } catch {
    if (gen !== paintGen) return;
    imgHref.value = undefined;
    return;
  }
  if (gen !== paintGen) return;

  const nw = source.naturalWidth || source.width;
  const nh = source.naturalHeight || source.height;
  if (!nw || !nh) return;

  const { w: lw, h: lh } = layoutDimensions(nw, nh);
  outW.value = lw;
  outH.value = lh;

  await nextTick();
  if (gen !== paintGen) return;

  const el = imageRef.value;
  let pixelW = Math.round(lw);
  let pixelH = Math.round(lh);

  if (el?.isConnected) {
    const r = el.getBoundingClientRect();
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    if (r.width > 0 && r.height > 0) {
      pixelW = Math.max(1, Math.min(MAX_CANVAS, Math.round(r.width * dpr)));
      pixelH = Math.max(1, Math.min(MAX_CANVAS, Math.round(r.height * dpr)));
    }
  }

  const rasterKey = `${props.href}|${pixelW}|${pixelH}|${lw}|${lh}`;
  if (rasterKey === lastRasterKey && imgHref.value) return;
  lastRasterKey = rasterKey;

  const canvas = document.createElement('canvas');
  canvas.width = pixelW;
  canvas.height = pixelH;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.drawImage(source, 0, 0, pixelW, pixelH);
  if (gen !== paintGen) return;
  imgHref.value = canvas.toDataURL();
}

function schedulePaint(): void {
  requestAnimationFrame(() => void paint());
}

onMounted(() => {
  void paint();
  void nextTick(() => {
    const el = imageRef.value;
    if (!el) return;
    resizeObserver = new ResizeObserver(() => schedulePaint());
    resizeObserver.observe(el);
  });
});

onActivated(() => {
  schedulePaint();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});

watch(
  () => props.href,
  () => {
    cachedSrc = null;
    cachedImg = null;
    lastRasterKey = '';
    schedulePaint();
  },
);

watch(
  () => [props.width, props.height] as const,
  () => schedulePaint(),
);
</script>

<template>
  <image
    ref="imageRef"
    :href="imgHref"
    :x="x"
    :y="y"
    :width="outW"
    :height="outH"
    :transform="transform"
  />
</template>
