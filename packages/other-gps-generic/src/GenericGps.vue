<script setup lang="ts">
import L from 'leaflet';
import { ref, watch, watchEffect, onMounted, onBeforeUnmount, unref } from 'vue';
import { installAircraftLayer } from './aircraft-icon';
import aircraftMarkerUrl from './aircraft-marker.png';

installAircraftLayer(L);

const props = defineProps<{
  latitudeDeg?: number | null;
  longitudeDeg?: number | null;
  headingDeg?: number | null;
  zoomLevel?: number | null;
  /**
   * API key for the openAIP aeronautical chart overlay (https://www.openaip.net).
   * If omitted or empty, only the base map tiles are shown (no key is read from source).
   */
  openaipApiKey?: string | null;
}>();

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | undefined;
let aircraft: { setLatLng: (p: { lat: number; lng: number; heading: number }) => void; addTo: (m: L.Map) => void } | undefined;
let openAipLayer: L.TileLayer | null = null;

function syncOpenAipLayer(): void {
  const m = map;
  if (!m) return;
  if (openAipLayer) {
    m.removeLayer(openAipLayer);
    openAipLayer = null;
  }
  const key = props.openaipApiKey?.trim();
  if (!key) return;
  openAipLayer = L.tileLayer(
    'https://{s}.api.tiles.openaip.net/api/data/openaip/{z}/{x}/{y}.png?apiKey=' +
      encodeURIComponent(key),
    {
      minZoom: 7,
      maxZoom: 17,
      attribution: '&copy; <a target="_blank" href="https://www.openaip.net">openaip.net</a>',
      detectRetina: true,
      subdomains: 'abc',
      format: 'image/png',
      transparent: true,
    },
  ).addTo(m);
}

watchEffect(() => {
  let zoom = unref(props.zoomLevel) ?? 5;
  const maxZoom = 19;
  const minZoom = 5;
  const newPos = {
    lat: unref(props.latitudeDeg) ?? 0,
    lng: unref(props.longitudeDeg) ?? 0,
    heading: unref(props.headingDeg) ?? 0,
  };
  if (map && aircraft) {
    if (zoom < minZoom) zoom = minZoom;
    if (zoom > maxZoom) zoom = maxZoom;
    const rad = (newPos.heading * Math.PI) / 180;
    const size = map.getSize();
    const offsetPx = {
      x: -Math.sin(rad) * (size.x / 3),
      y: Math.cos(rad) * (size.y / 3),
    };
    const targetPoint = map.project(newPos, zoom);
    const centerPoint = targetPoint.subtract([offsetPx.x, offsetPx.y]);
    const newCenter = map.unproject(centerPoint, zoom);
    map.setView(newCenter, zoom);
    aircraft.setLatLng(newPos);
  }
});

onMounted(() => {
  const el = mapContainer.value;
  if (!el) return;

  map = L.map(el, {
    zoomControl: false,
    attributionControl: false,
  }).setView([53.5, 10.0], 5);

  L.tileLayer('//a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    minZoom: 5,
    maxZoom: 16,
    attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
  }).addTo(map);

  L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 17,
    maxZoom: 19,
    attribution:
      'Map data &copy; <a target="_blank" href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    detectRetina: true,
    subdomains: 'abc',
    format: 'image/png',
    transparent: true,
  }).addTo(map);

  syncOpenAipLayer();

  aircraft = (L as unknown as { aircraft: typeof L.marker }).aircraft(map.getCenter(), { heading: 220 });
  aircraft.addTo(map);
});

watch(
  () => props.openaipApiKey,
  () => syncOpenAipLayer(),
);

onBeforeUnmount(() => {
  openAipLayer = null;
  map?.remove();
  map = undefined;
  aircraft = undefined;
});
</script>

<template>
  <div ref="mapContainer" class="other-gps-generic__map">GPS</div>
</template>

<style scoped>
/* Do not set width/height here: the host often merges panel classes (.gauge3, etc.) onto this
   root; scoped rules would override those and break the cutout (100% ≠ --cutout_3inch). */
.other-gps-generic__map {
  box-sizing: border-box;
}
</style>

<style>
/* Leaflet injects .acicon outside scoped boundaries; image bundled from ./aircraft-marker.png */
.other-gps-generic__map .other-gps-generic-acicon {
  width: 40px;
  height: 40px;
  margin: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: v-bind('"url(" + aircraftMarkerUrl + ")"');
}
</style>
