import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VerticalSpeedIndicator from './VerticalSpeedIndicator.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountVsi(props: { verticalSpeedFpm?: number | null } = {}) {
  return mount(VerticalSpeedIndicator, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

function needleGroup(w: ReturnType<typeof mountVsi>) {
  const g = w.findAll('g').find((el) => !el.classes().includes('prerendered-stub'));
  if (!g) throw new Error('needle <g> not found');
  return g;
}

describe('VerticalSpeedIndicator', () => {
  it('maps 0 fpm to center needle angle', () => {
    const w = mountVsi({ verticalSpeedFpm: 0 });
    expect(needleGroup(w).attributes('transform')).toBe('rotate(0 250 250)');
  });

  it('interpolates between table knots', () => {
    const w = mountVsi({ verticalSpeedFpm: 1000 });
    expect(needleGroup(w).attributes('transform')).toBe('rotate(80 250 250)');
  });

  it('treats null input as 0 fpm', () => {
    const w = mountVsi({ verticalSpeedFpm: null });
    expect(needleGroup(w).attributes('transform')).toBe('rotate(0 250 250)');
  });
});
