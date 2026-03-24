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
  const watchedProperties = new Map<string, WatchedProperty>();
  const isConnected = ref(false);
  const host = ref('');

  let activeConnection: PanelPropertyConnection | null = null;

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
        if (
          Math.abs(Number(nodeEvent.value) - Number(prop.oldValue ?? 0)) > (prop.e || 0) / 100
        ) {
          prop.r.value = nodeEvent.value;
          prop.oldValue = nodeEvent.value;
        }
        break;
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
        console.error(`unknown type for ${JSON.stringify(nodeEvent)}`);
    }
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
      },
      onError: () => {
        isConnected.value = false;
      },
      onPropertyMessage: (msg) => {
        const subscription = watchedProperties.get(msg.path);
        if (!subscription) {
          console.error(`Unwatched property ${msg.path} ignored`);
          return;
        }
        applyPropertyUpdate(subscription, msg);
      },
    });
  }

  function disconnect(): void {
    const c = activeConnection;
    activeConnection = null;
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
