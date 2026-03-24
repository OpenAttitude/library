import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EngineRpmGauge from './EngineRpmGauge.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountRpm(props: { rpm?: number | null } = {}) {
  return mount(EngineRpmGauge, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

function needleGroup(w: ReturnType<typeof mountRpm>) {
  const g = w.findAll('g').find((el) => !el.classes().includes('prerendered-stub'));
  if (!g) throw new Error('needle <g> not found');
  return g;
}

describe('EngineRpmGauge', () => {
  it('clamps needle at minimum rotation below 300 rpm', () => {
    const w = mountRpm({ rpm: 0 });
    expect(needleGroup(w).attributes('transform')).toBe('rotate(-128 250 250)');
  });

  it('maps ~1900 rpm to zero needle deflection on the linear segment', () => {
    const w = mountRpm({ rpm: 1900 });
    expect(needleGroup(w).attributes('transform')).toBe('rotate(0 250 250)');
  });

  it('reaches maximum needle angle at high rpm', () => {
    const w = mountRpm({ rpm: 4000 });
    expect(needleGroup(w).attributes('transform')).toBe('rotate(128 250 250)');
  });
});
