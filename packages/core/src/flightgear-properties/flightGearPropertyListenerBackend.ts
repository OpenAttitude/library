import { unref, watch, type WatchStopHandle } from 'vue';
import { useWebSocket } from '@vueuse/core';
import type { PanelPropertyBackend, PanelPropertyBackendListeners, PanelPropertyConnection } from './types';

/**
 * FlightGear generic `PropertyListener` WebSocket (path `/PropertyListener` on the generic host).
 * Protocol: JSON commands `addListener` / `get`, JSON events with `path`, `value`, `type`.
 */
export function createFlightGearPropertyListenerBackend(): PanelPropertyBackend {
  return {
    id: 'flightgear-property-listener',
    connect(endpoint: string, listeners: PanelPropertyBackendListeners): PanelPropertyConnection {
      const wsUrl = `ws://${endpoint}/PropertyListener`;
      let stopDataWatch: WatchStopHandle | null = null;

      const { data, send, close } = useWebSocket(wsUrl, {
        autoReconnect: { delay: 10_000 },
        onConnected: () => listeners.onConnected(),
        onDisconnected: () => listeners.onDisconnected(),
        onError: () => listeners.onError?.(),
      });

      stopDataWatch = watch(
        data,
        (value) => {
          let node: unknown;
          try {
            node = JSON.parse(unref(value) as string);
          } catch {
            console.error('invalid JSON data from PropertyListener ignored');
            return;
          }
          if (typeof node !== 'object' || node === null || !('path' in node)) return;
          const n = node as { path: string; value?: unknown; type?: string };
          listeners.onPropertyMessage({
            path: n.path,
            value: n.value,
            type: n.type,
          });
        },
        { flush: 'sync' },
      );

      return {
        disconnect() {
          stopDataWatch?.();
          stopDataWatch = null;
          close();
        },
        requestSubscription(path: string) {
          send(JSON.stringify({ command: 'addListener', node: path }));
          send(JSON.stringify({ command: 'get', node: path }));
        },
      };
    },
  };
}
