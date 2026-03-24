import { describe, expect, it } from 'vitest';
import { clamp } from './clamp';

describe('clamp', () => {
  it('returns val when strictly inside [min, max]', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, -10, 10)).toBe(-3);
  });

  it('returns min when val is below min', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  it('returns max when val is above max', () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it('returns val when equal to min or max', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('handles negative ranges', () => {
    expect(clamp(-15, -20, -10)).toBe(-15);
    expect(clamp(-25, -20, -10)).toBe(-20);
    expect(clamp(-5, -20, -10)).toBe(-10);
  });
});
