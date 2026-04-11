import { flightGearHttpBaseUrl } from './httpBase';

export type FlightGearScreenshotImageFormat = 'jpg' | 'png';

export type FlightGearScreenshotUrlOptions = {
  /** Image format (FlightGear default is often JPG). */
  type?: FlightGearScreenshotImageFormat;
  /** Optional render window name (FG {@code /rendering/camera-group/window/name}). */
  window?: string;
  /** Optional canvas index for a Canvas texture capture. */
  canvasindex?: number;
  /** Cache-buster query param (old Phi used {@code t=} with a timestamp). */
  cacheBust?: number | string;
};

/**
 * Absolute URL for FlightGear’s embedded {@code GET /screenshot} handler
 * ({@code ScreenshotUriHandler.cxx}).
 */
export function flightGearScreenshotUrl(host: string, options?: FlightGearScreenshotUrlOptions): string {
  const base = flightGearHttpBaseUrl(host);
  const q = new URLSearchParams();
  const t = options?.type ?? 'jpg';
  if (t) q.set('type', t);
  const w = options?.window?.trim();
  if (w) q.set('window', w);
  if (options?.canvasindex != null && Number.isFinite(options.canvasindex)) {
    q.set('canvasindex', String(Math.trunc(options.canvasindex)));
  }
  if (options?.cacheBust != null) q.set('t', String(options.cacheBust));
  const qs = q.toString();
  return qs ? `${base}/screenshot?${qs}` : `${base}/screenshot`;
}
