/** Normalized host (no scheme), same rules as {@link flightGearHttpBaseUrl}. */
function flightGearHostKey(host: string): string {
  const t = host.trim();
  if (!t) return 'localhost';
  return t.replace(/^(https?|ws|wss):\/\//i, '');
}

/** Strip accidental schemes and build {@code http://host:port} for the embedded FlightGear httpd. */
export function flightGearHttpBaseUrl(host: string): string {
  const withoutScheme = flightGearHostKey(host);
  const hasPort = /:\d+$/.test(withoutScheme.split('/')[0] ?? '');
  return hasPort ? `http://${withoutScheme}` : `http://${withoutScheme}`;
}

/**
 * WebSocket URL for FlightGear’s generic PropertyListener socket
 * ({@code flightgear/src/Network/http/PropertyChangeWebsocket.cxx}).
 */
export function flightGearPropertyListenerWsUrl(host: string): string {
  return `ws://${flightGearHostKey(host)}/PropertyListener`;
}
