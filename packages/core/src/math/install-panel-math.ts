import { clamp } from './clamp';
import { interpolate } from './interpolate';
import './math-global';

/** Attach `clamp` and `interpolate` to `Math` (idempotent). Call once from app bootstrap. */
export function installPanelMath(): void {
  Math.clamp = Math.clamp || clamp;
  Math.interpolate = Math.interpolate || interpolate;
}
