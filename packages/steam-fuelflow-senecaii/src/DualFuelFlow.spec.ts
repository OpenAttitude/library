import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DualFuelFlow from './DualFuelFlow.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountFf(props: {
  fuelFlowGphLeft?: number | null;
  fuelFlowGphRight?: number | null;
} = {}) {
  return mount(DualFuelFlow, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('DualFuelFlow', () => {
  it('maps each engine flow through the shared table', () => {
    const w = mountFf({ fuelFlowGphLeft: 0, fuelFlowGphRight: 25 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[1].attributes('data-transform')).toBe('rotate(-210 250 250)');
    expect(stubs[2].attributes('data-transform')).toBe('rotate(80 250 250)');
  });
});
