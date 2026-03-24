import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FlapIndicator from './FlapIndicator.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountFlap(props: { flapsNorm?: number | null; trimNorm?: number | null } = {}) {
  return mount(FlapIndicator, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('FlapIndicator', () => {
  it('maps flap position to needle chain transform', () => {
    const w = mountFlap({ flapsNorm: 0.5, trimNorm: 0 });
    expect(w.findAll('.prerendered-stub')[1].attributes('data-transform')).toBe(
      'translate(145 250) rotate(0) translate(-7.5 -7.5)',
    );
  });

  it('maps trim to vertical translate with clamp', () => {
    const w = mountFlap({ flapsNorm: 0, trimNorm: 1 });
    expect(w.find('rect').attributes('transform')).toBe('translate(0 -80)');
  });
});
