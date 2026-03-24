import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Ki227Adf from './Ki227Adf.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountKi227(props: {
  indicatedBearingDeg?: number | null;
  cardHeadingDeg?: number | null;
} = {}) {
  return mount(Ki227Adf, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('Ki227Adf', () => {
  it('rotates face and pointer independently', () => {
    const w = mountKi227({ cardHeadingDeg: 30, indicatedBearingDeg: 90 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[0].attributes('data-transform')).toBe('rotate(-30 250 250)');
    expect(stubs[1].attributes('data-transform')).toBe('rotate(90 250 250)');
  });
});
