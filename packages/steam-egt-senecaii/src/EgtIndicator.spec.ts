import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EgtIndicator from './EgtIndicator.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountEgt(props: { egtDegF?: number | null } = {}) {
  return mount(EgtIndicator, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

function needleTransform(wrapper: ReturnType<typeof mountEgt>) {
  const stubs = wrapper.findAll('.prerendered-stub');
  expect(stubs.length).toBe(3);
  return stubs[1].attributes('data-transform');
}

describe('EgtIndicator', () => {
  it('maps 1200 °F table endpoint to -45° needle rotation', () => {
    const w = mountEgt({ egtDegF: 1200 });
    expect(needleTransform(w)).toBe('rotate(-45 250 350)');
  });

  it('maps 1700 °F table endpoint to 45° needle rotation', () => {
    const w = mountEgt({ egtDegF: 1700 });
    expect(needleTransform(w)).toBe('rotate(45 250 350)');
  });

  it('interpolates between knots', () => {
    const w = mountEgt({ egtDegF: 1450 });
    expect(needleTransform(w)).toBe('rotate(0 250 350)');
  });

  it('clamps below range to minimum scale value', () => {
    const w = mountEgt({ egtDegF: 0 });
    expect(needleTransform(w)).toBe('rotate(-45 250 350)');
  });

  it('clamps above range to maximum scale value', () => {
    const w = mountEgt({ egtDegF: 2000 });
    expect(needleTransform(w)).toBe('rotate(45 250 350)');
  });

  it('treats null prop like 0 °F for interpolation input', () => {
    const w = mountEgt({ egtDegF: null });
    expect(needleTransform(w)).toBe('rotate(-45 250 350)');
  });
});
