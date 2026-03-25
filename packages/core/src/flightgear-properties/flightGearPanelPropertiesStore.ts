import { defineStore } from 'pinia';
import { ref, type Ref, unref, watch } from 'vue';

import { getPanelPropertyBackend } from './panelPropertyBackendRegistry';
import type {
  PanelPropertyConnection,
  PropertySubscription,
  PropertyWireMessage,
  WatchedProperty,
} from './types';

/**
 * Pinia store: live FlightGear `/sim` (etc.) property values over the PropertyListener WebSocket.
 * Set `host` to `hostname` or `hostname:port`, then call `subscribe(path)` for each FG property path.
 */
export const useFlightGearPanelPropertiesStore = defineStore('flightgear-panel-properties', () => {
  /** Upper bound for property-apply frequency (protects CPU under very high WS rates). */
  const MAX_FLUSH_FPS = 60;
  const MIN_FLUSH_INTERVAL_MS = Math.ceil(1000 / MAX_FLUSH_FPS);

  const watchedProperties = new Map<string, WatchedProperty>();
  const pendingUpdates = new Map<string, PropertyWireMessage>();
  const unknownTypeWarnings = new Set<string>();
  const isConnected = ref(false);
  const host = ref('');

  let activeConnection: PanelPropertyConnection | null = null;
  let flushScheduled = false;
  let flushTimerId: number | null = null;
  let lastFlushAtMs = 0;

  /**
   * When host is empty we are not using a backend; treat as serviceable (no OffSpinner).
   * When host is set, serviceable means we have an active socket until disconnect/error.
   */
  function setServiceableForCurrentHost(): void {
    const endpoint = unref(host)?.trim() ?? '';
    isConnected.value = endpoint === '';
  }

  watch(
    host,
    () => {
      disconnect();
      connect();
    },
    { immediate: true },
  );

  function applyPropertyUpdate(prop: WatchedProperty, nodeEvent: PropertyWireMessage): void {
    if (prop.trace) {
      console.log(`new: "${nodeEvent.value}", old: "${prop.oldValue}", ${JSON.stringify(nodeEvent)}`);
    }
    const type = prop.type ?? nodeEvent.type;
    switch (type) {
      case 'double':
      case 'float':
      case 'int':
      {
        const nextValue = Number(nodeEvent.value);
        if (Number.isNaN(nextValue)) break;
        const prevValue = typeof prop.oldValue === 'number' ? prop.oldValue : Number(prop.oldValue ?? 0);
        if (Math.abs(nextValue - prevValue) > (prop.e || 0) / 100) {
          prop.r.value = nextValue;
          prop.oldValue = nextValue;
        }
        break;
      }
      case 'bool': {
        let v: unknown = nodeEvent.value;
        if (type !== nodeEvent.type) {
          const n = Number(nodeEvent.value);
          if (Number.isNaN(n)) {
            v = nodeEvent.value === 'true';
          } else {
            v = n !== 0;
          }
        }
        if (v !== prop.oldValue) {
          prop.r.value = v;
          prop.oldValue = v;
        }
        break;
      }
      default:
        if (!unknownTypeWarnings.has(nodeEvent.path)) {
          unknownTypeWarnings.add(nodeEvent.path);
          console.error(`unknown type for ${JSON.stringify(nodeEvent)}`);
        }
    }
  }

  function flushPendingUpdates(): void {
    flushScheduled = false;
    flushTimerId = null;
    lastFlushAtMs = Date.now();
    pendingUpdates.forEach((msg, path) => {
      const subscription = watchedProperties.get(path);
      if (!subscription) return;
      applyPropertyUpdate(subscription, msg);
    });
    pendingUpdates.clear();
  }

  function scheduleFlush(): void {
    if (flushScheduled) return;
    flushScheduled = true;
    const now = Date.now();
    const waitMs = Math.max(0, MIN_FLUSH_INTERVAL_MS - (now - lastFlushAtMs));
    flushTimerId = globalThis.setTimeout(flushPendingUpdates, waitMs);
  }

  function connect(): void {
    const endpoint = unref(host)?.trim() ?? '';
    if (!endpoint) {
      console.log('No host specified, not connecting');
      setServiceableForCurrentHost();
      return;
    }

    disconnect();
    console.log(`connecting to ${endpoint}`);

    const backend = getPanelPropertyBackend();
    activeConnection = backend.connect(endpoint, {
      onConnected: () => {
        isConnected.value = true;
        watchedProperties.forEach((_, path) => activeConnection?.requestSubscription(path));
      },
      onDisconnected: () => {
        isConnected.value = false;
        pendingUpdates.clear();
      },
      onError: () => {
        isConnected.value = false;
        pendingUpdates.clear();
      },
      onPropertyMessage: (msg) => {
        if (!watchedProperties.has(msg.path)) return;
        pendingUpdates.set(msg.path, msg);
        scheduleFlush();
      },
    });
  }

  function disconnect(): void {
    const c = activeConnection;
    activeConnection = null;
    pendingUpdates.clear();
    if (flushTimerId != null) {
      if (
        typeof globalThis !== 'undefined' &&
        'cancelAnimationFrame' in globalThis &&
        typeof globalThis.cancelAnimationFrame === 'function'
      ) {
        globalThis.cancelAnimationFrame(flushTimerId);
      } else {
        clearTimeout(flushTimerId);
      }
      flushTimerId = null;
      flushScheduled = false;
    }
    c?.disconnect();
    setServiceableForCurrentHost();
  }

  function subscribe(path?: string, subscription?: PropertySubscription): Ref<any> {
    if (!path) return ref(null);
    console.log(`subscribing to ${path}`);

    const wp = watchedProperties.get(path);
    if (wp) {
      if (subscription?.type && wp.type !== subscription?.type) {
        console.error(`Type mismatch for ${path}: ${wp.type} != ${subscription!.type}`);
        wp.type = subscription!.type;
      }
      if (subscription?.e !== undefined && wp.e !== subscription?.e) {
        console.error(`Epsilon mismatch for ${path}: ${wp.e} != ${subscription?.e}`);
        wp.e = subscription!.e;
      }
      if (subscription?.trace && wp.trace !== subscription?.trace) {
        console.error(`Trace mismatch for ${path}: ${wp.trace} != ${subscription!.trace}`);
        wp.trace = subscription!.trace;
      }
      return wp.r as Ref<any>;
    }
    const r = ref(null);
    watchedProperties.set(path, {
      ...subscription,
      trace: false,
      e: 0.0,
      oldValue: null,
      r,
    });
    const endpoint = unref(host)?.trim() ?? '';
    if (activeConnection && endpoint) {
      activeConnection.requestSubscription(path);
    }
    return r as Ref<any>;
  }

  function unsubscribe(_path: string): void {
    throw new Error(`unsubscribing from ${_path} not implemented`);
  }

  return { connect, disconnect, subscribe, unsubscribe, isConnected, host };
});
