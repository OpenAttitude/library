import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EngineInstruments from './EngineInstruments.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template: '<g class="prerendered-stub" />',
};

function mountRow(props: Record<string, number | null | undefined> = {}) {
  return mount(EngineInstruments, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('EngineInstruments', () => {
  it('drives each vertical bar from its own interpolation table', () => {
    const w = mountRow({
      busCurrentA: -70,
      chtDegF: 330,
      oilTempDegF: 157.5,
      oilPressurePsi: 55,
      fuelLevelGalUs: 30,
    });
    const rects = w.findAll('rect');
    expect(rects).toHaveLength(5);
    expect(rects[0].attributes('transform')).toBe('rotate(30 116.672 175)');
    expect(rects[1].attributes('transform')).toBe('rotate(0 333 175)');
    expect(rects[2].attributes('transform')).toBe('rotate(0 545 175)');
    expect(rects[3].attributes('transform')).toBe('rotate(0 760 175)');
    expect(rects[4].attributes('transform')).toBe('rotate(0 975 175)');
  });
});
