<script setup lang="ts">
/** Must load with this module (not inside async init): Leaflet panes rely on these rules being live before `L.map()`. */
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, TileLayer } from 'leaflet';
import { ref, watch, watchEffect, onMounted, onBeforeUnmount, unref, nextTick } from 'vue';
import { installAircraftLayer } from './aircraft-icon';
import aircraftMarkerUrl from './aircraft-marker.png';

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
let map: LeafletMap | undefined;
let aircraft:
  | { setLatLng: (p: { lat: number; lng: number; heading: number }) => void; addTo: (m: LeafletMap) => void }
  | undefined;
let openAipLayer: TileLayer | null = null;
/** Set after dynamic `import('leaflet')`; required for overlays and teardown. */
let LRef: typeof import('leaflet').default | null = null;
let disposed = false;

/** Default map view (Hamburg area) when FG position is not available yet — matches initial `setView`. */
const DEFAULT_LAT = 53.5;
const DEFAULT_LNG = 10.0;
const DEFAULT_ZOOM = 5;

function syncOpenAipLayer(): void {
  const m = map;
  const L = LRef;
  if (!m || !L) return;
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

function applyPropsToMap(): void {
  const m = map;
  const ac = aircraft;
  if (!m || !ac) return;
  let zoom = unref(props.zoomLevel) ?? DEFAULT_ZOOM;
  const maxZoom = 19;
  const minZoom = 5;
  const latRaw = unref(props.latitudeDeg);
  const lngRaw = unref(props.longitudeDeg);
  const haveLivePosition = latRaw != null && lngRaw != null;
  const newPos = {
    lat: haveLivePosition ? latRaw : DEFAULT_LAT,
    lng: haveLivePosition ? lngRaw : DEFAULT_LNG,
    heading: unref(props.headingDeg) ?? 0,
  };
  if (zoom < minZoom) zoom = minZoom;
  if (zoom > maxZoom) zoom = maxZoom;
  const rad = (newPos.heading * Math.PI) / 180;
  const size = m.getSize();
  const offsetPx = {
    x: -Math.sin(rad) * (size.x / 3),
    y: Math.cos(rad) * (size.y / 3),
  };
  const targetPoint = m.project(newPos, zoom);
  const centerPoint = targetPoint.subtract([offsetPx.x, offsetPx.y]);
  const newCenter = m.unproject(centerPoint, zoom);
  m.setView(newCenter, zoom);
  ac.setLatLng(newPos);
}

watchEffect(() => {
  unref(props.latitudeDeg);
  unref(props.longitudeDeg);
  unref(props.headingDeg);
  unref(props.zoomLevel);
  applyPropsToMap();
});

async function initMap(): Promise<void> {
  const leafletMod = await import('leaflet');
  const L = leafletMod.default;
  if (disposed) return;
  LRef = L;
  installAircraftLayer(L);

  const el = mapContainer.value;
  if (!el || disposed) return;

  map = L.map(el, {
    zoomControl: false,
    attributionControl: false,
  }).setView([DEFAULT_LAT, DEFAULT_LNG], DEFAULT_ZOOM);

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

  await nextTick();
  await new Promise<void>((r) => requestAnimationFrame(() => r()));
  if (disposed || !map) return;
  map.invalidateSize?.();
  applyPropsToMap();
}

onMounted(() => {
  void initMap();
});

watch(
  () => props.openaipApiKey,
  () => syncOpenAipLayer(),
);

onBeforeUnmount(() => {
  disposed = true;
  openAipLayer = null;
  map?.remove();
  map = undefined;
  aircraft = undefined;
  LRef = null;
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
