import { describe, expect, it } from 'vitest';
import { interpolate } from './interpolate';

/** Simple two-point table: (0, 0) -> (10, 100), slope 10 */
const LINEAR: [number, number][] = [
  [0, 0],
  [10, 100],
];

/** Piecewise: 0->0, then 10->50, then 20->50 (flat segment) */
const PIECEWISE: [number, number][] = [
  [0, 0],
  [10, 50],
  [20, 50],
];

describe('interpolate', () => {
  it('returns first knot y when val is below the first x', () => {
    expect(interpolate(-5, LINEAR)).toBe(0);
    expect(interpolate(-1, PIECEWISE)).toBe(0);
  });

  it('returns first knot y when val equals first x', () => {
    expect(interpolate(0, LINEAR)).toBe(0);
  });

  it('interpolates linearly between two interior knots', () => {
    expect(interpolate(5, LINEAR)).toBe(50);
    expect(interpolate(2.5, LINEAR)).toBe(25);
  });

  it('returns exact y at knot x values', () => {
    expect(interpolate(10, LINEAR)).toBe(100);
    expect(interpolate(10, PIECEWISE)).toBe(50);
    expect(interpolate(20, PIECEWISE)).toBe(50);
  });

  it('handles flat segment (equal y on consecutive knots)', () => {
    expect(interpolate(15, PIECEWISE)).toBe(50);
  });

  it('returns last knot y when val is above last x', () => {
    expect(interpolate(100, LINEAR)).toBe(100);
    expect(interpolate(999, PIECEWISE)).toBe(50);
  });

  it('works with a minimal two-knot table', () => {
    const t: [number, number][] = [
      [100, 1000],
      [200, 2000],
    ];
    expect(interpolate(150, t)).toBe(1500);
  });
});
