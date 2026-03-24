import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Ki209 from './Ki209.vue';

const prerenderedStub = {
  props: ['href', 'transform', 'x', 'y', 'width'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountKi209(props: Record<string, number | boolean | null | undefined> = {}) {
  return mount(Ki209, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('Ki209', () => {
  it('rotates compass by negative OBS selection', () => {
    const w = mountKi209({ selectedObsDeg: 45 });
    expect(w.findAll('.prerendered-stub')[0].attributes('data-transform')).toBe('rotate(-45 250 250)');
  });

  it('offsets CDI when nav is valid', () => {
    const w = mountKi209({
      navDataValid: true,
      headingNeedleDeflectionNorm: 1,
    });
    expect(w.find('#cdi').attributes('transform')).toBe('translate(110 0)');
  });

  it('zeroes lateral deflection when nav is invalid', () => {
    const w = mountKi209({
      navDataValid: false,
      headingNeedleDeflectionNorm: 1,
    });
    expect(w.find('#cdi').attributes('transform')).toBe('translate(0 0)');
  });
});
