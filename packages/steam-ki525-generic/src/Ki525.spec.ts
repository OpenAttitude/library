import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Ki525 from './Ki525.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountKi525(props: Record<string, number | boolean | null | undefined> = {}) {
  return mount(Ki525, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('Ki525', () => {
  it('derives heading bug rotation from selected vs indicated heading', () => {
    const w = mountKi525({
      indicatedHeadingDeg: 0,
      selectedHeadingDeg: 90,
    });
    expect(w.findAll('.prerendered-stub')[1].attributes('data-transform')).toBe('rotate(90 250 250)');
  });

  it('translates CDI needle when nav is valid', () => {
    const w = mountKi525({
      navDataValid: true,
      indicatedHeadingDeg: 0,
      selectedCourseDeg: 0,
      cdiDeflection: 10,
    });
    const cdi = w.find('path[d="m 247.5,160 h 5 v 180 h -5 z"]');
    const t = cdi.attributes('transform')!;
    const m = /^translate\(([-\d.]+)\s+0\)$/.exec(t);
    expect(m).not.toBeNull();
    expect(Number(m![1])).toBeCloseTo(110, 10);
  });
});
