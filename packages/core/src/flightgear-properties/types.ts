import type { Ref } from 'vue';

/** Options when subscribing to a simulator property path (numeric epsilon, bool, tracing). */
export interface PropertySubscription {
  type?: string;
  trace?: boolean;
  /** Relative change threshold for numeric types (implementation-specific; FG uses percent). */
  e?: number;
}

/**
 * Normalized update delivered by a {@link PanelPropertyBackend} after parsing transport-specific
 * payloads. Use this shape in new backends so the store can apply updates uniformly.
 */
export interface PropertyWireMessage {
  path: string;
  value: unknown;
  type?: string;
}

export interface PanelPropertyConnection {
  disconnect(): void;
  /** Register interest in `path` and request current value (semantics depend on backend). */
  requestSubscription(path: string): void;
  /** Send a raw JSON line (FlightGear PropertyListener supports e.g. `{ command: "exec", ... }`). */
  sendRaw?(text: string): void;
}

export interface PanelPropertyBackendListeners {
  onConnected(): void;
  onDisconnected(): void;
  onError?(): void;
  onPropertyMessage(message: PropertyWireMessage): void;
}

/**
 * Pluggable source of live property values for panel instruments.
 * Default: {@link createFlightGearPropertyListenerBackend} (FG `PropertyListener` WebSocket).
 *
 * Implementations should:
 * - Call `listeners.onPropertyMessage` with `{ path, value, type }` in FG-compatible form, or map native fields to paths the panel already uses.
 * - Call `onConnected` / `onDisconnected` / `onError` so `isConnected` reflects transport state.
 * - Support repeated `requestSubscription` after reconnect (e.g. auto-resubscribe the same paths).
 */
export interface PanelPropertyBackend {
  /** Stable id for logging / UI (e.g. `flightgear-property-listener`). */
  readonly id: string;
  /**
   * @param endpoint Connection target. FlightGear backend: host or `host:port` without scheme.
   */
  connect(endpoint: string, listeners: PanelPropertyBackendListeners): PanelPropertyConnection;
}

export interface WatchedProperty extends PropertySubscription {
  r: Ref<unknown>;
  oldValue: unknown;
}
