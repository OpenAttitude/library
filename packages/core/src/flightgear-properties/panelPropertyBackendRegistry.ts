import type { PanelPropertyBackend } from './types';
import { createFlightGearPropertyListenerBackend } from './flightGearPropertyListenerBackend';

let backendFactory: () => PanelPropertyBackend = createFlightGearPropertyListenerBackend;

/** Returns the backend used by {@link useFlightGearPanelPropertiesStore} for the next connection. */
export function getPanelPropertyBackend(): PanelPropertyBackend {
  return backendFactory();
}

/**
 * Replace the default FlightGear backend (e.g. for tests or another simulator).
 * Call before the store connects, or after {@link useFlightGearPanelPropertiesStore}'s `disconnect`.
 */
export function setPanelPropertyBackendFactory(factory: () => PanelPropertyBackend): void {
  backendFactory = factory;
}

/** Restore the built-in FlightGear `PropertyListener` backend. */
export function resetPanelPropertyBackendFactory(): void {
  backendFactory = createFlightGearPropertyListenerBackend;
}
