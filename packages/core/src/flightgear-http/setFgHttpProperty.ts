import { flightGearHttpBaseUrl } from './httpBase';

export type SetFgHttpPropertyOptions = {
  /**
   * Same host as PropertyListener: {@code hostname} or {@code hostname:port}.
   */
  host: string;
  /** Property path like {@code sim/time/warp} or {@code /sim/time/warp}. */
  propertyPath: string;
  /** Leaf value written with {@code JSON::setValueFromJSON}. */
  value: string | number | boolean;
  signal?: AbortSignal;
};

/**
 * Sets a single property via {@code POST /json/<path>} with body {@code { "value": ... }}.
 *
 * Server: {@code flightgear/src/Network/http/JsonUriHandler.cxx} — body is merged into the node
 * with {@code JSON::toProp}; for a leaf, {@code { value }} is enough.
 *
 * PropertyListener WebSocket also supports {@code { "command": "set", "node": "...", "value": ... }} with the same
 * value semantics ({@code PropertyChangeWebsocket::handleSetCommand}), but subtree **reads** for the property tree
 * still require HTTP {@code GET /json/...?d≥1}; see {@code handleGetCommand} (fixed depth {@code 0}).
 */
export async function setFgHttpProperty(options: SetFgHttpPropertyOptions): Promise<Response> {
  const base = flightGearHttpBaseUrl(options.host);
  const path = options.propertyPath.replace(/^\/+/, '');
  const url = `${base}/json/${path}`;
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: options.value }),
    signal: options.signal,
  });
}
