import { describe, expect, it } from 'vitest';

import { flightGearHttpBaseUrl } from './httpBase';

describe('flightGearHttpBaseUrl', () => {
  it('adds http and preserves port', () => {
    expect(flightGearHttpBaseUrl('127.0.0.1:5701')).toBe('http://127.0.0.1:5701');
  });

  it('strips ws://', () => {
    expect(flightGearHttpBaseUrl('ws://localhost:8080')).toBe('http://localhost:8080');
  });

  it('strips http://', () => {
    expect(flightGearHttpBaseUrl('http://10.0.0.5:5500')).toBe('http://10.0.0.5:5500');
  });
});
