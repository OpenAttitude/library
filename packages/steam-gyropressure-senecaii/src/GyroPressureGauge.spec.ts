import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GyroPressureGauge from './GyroPressureGauge.vue';

const prerenderedStub = {
  props: ['href', 'transform', 'x', 'y'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-x="x" :data-y="y" :data-transform="transform ?? \'\'" />',
};

function mountGp(props: {
  suctionInHg?: number | null;
  vacuumInoperativeLeft?: boolean;
  vacuumInoperativeRight?: boolean;
} = {}) {
  return mount(GyroPressureGauge, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('GyroPressureGauge', () => {
  it('maps suction through the needle table', () => {
    const w = mountGp({ suctionInHg: 5 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[stubs.length - 1].attributes('data-transform')).toBe('rotate(0 250 250)');
  });

  it('renders vacuum warning icons when flags are set', () => {
    const w = mountGp({ vacuumInoperativeLeft: true, vacuumInoperativeRight: true });
    const warnings = w.findAll('.prerendered-stub').filter((s) => s.attributes('data-x') === '120');
    expect(warnings.length).toBeGreaterThanOrEqual(1);
  });
});
