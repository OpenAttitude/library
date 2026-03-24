import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AirspeedIndicator from './AirspeedIndicator.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountAsi(props: {
  indicatedSpeedKt?: number | null;
  tasFaceRotationDeg?: number | null;
} = {}) {
  return mount(AirspeedIndicator, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

function iasNeedleGroup(w: ReturnType<typeof mountAsi>) {
  const g = w.findAll('g').find((el) => !el.classes().includes('prerendered-stub'));
  if (!g) throw new Error('needle <g> not found');
  return g;
}

describe('AirspeedIndicator', () => {
  it('maps IAS through interpolation table', () => {
    const w = mountAsi({ indicatedSpeedKt: 100 });
    expect(iasNeedleGroup(w).attributes('transform')).toBe('rotate(153 250 250)');
  });

  it('negates TAS face rotation on sub-scale', () => {
    const w = mountAsi({ tasFaceRotationDeg: 45 });
    expect(w.findAll('.prerendered-stub')[0].attributes('data-transform')).toBe('rotate(-45 250 250)');
  });

  it('treats null IAS as 0 kt', () => {
    const w = mountAsi({ indicatedSpeedKt: null });
    expect(iasNeedleGroup(w).attributes('transform')).toBe('rotate(0 250 250)');
  });
});
