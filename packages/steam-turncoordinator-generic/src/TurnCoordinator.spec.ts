import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TurnCoordinator from './TurnCoordinator.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountTc(props: {
  indicatedTurnRate?: number | null;
  indicatedSlipSkid?: number | null;
} = {}) {
  return mount(TurnCoordinator, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('TurnCoordinator', () => {
  it('clamp-scales turn rate to airplane rotation', () => {
    const w = mountTc({ indicatedTurnRate: 2, indicatedSlipSkid: 0 });
    expect(w.findAll('.prerendered-stub')[2].attributes('data-transform')).toBe('rotate(40 250 263) ');
  });

  it('clamp-scales slip to ball rotation', () => {
    const w = mountTc({ indicatedTurnRate: 0, indicatedSlipSkid: 2 });
    expect(w.find('#ball').attributes('transform')).toBe('rotate( 11.458 250 -240)');
  });

  it('treats null props like zero', () => {
    const w = mountTc({ indicatedTurnRate: null, indicatedSlipSkid: null });
    expect(w.findAll('.prerendered-stub')[2].attributes('data-transform')).toBe('rotate(0 250 263) ');
    expect(w.find('#ball').attributes('transform')).toBe('rotate( 0 250 -240)');
  });
});
