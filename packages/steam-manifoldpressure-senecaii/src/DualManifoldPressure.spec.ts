import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DualManifoldPressure from './DualManifoldPressure.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountMp(props: { mpOsiLeft?: number | null; mpOsiRight?: number | null } = {}) {
  return mount(DualManifoldPressure, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('DualManifoldPressure', () => {
  it('maps left and right mp independently', () => {
    const w = mountMp({ mpOsiLeft: 0, mpOsiRight: 90 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[1].attributes('data-transform')).toBe('rotate(-120 250 250)');
    expect(stubs[2].attributes('data-transform')).toBe('rotate(120 250 250)');
  });

  it('interpolates within the scale table', () => {
    const w = mountMp({ mpOsiLeft: 30, mpOsiRight: 30 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[1].attributes('data-transform')).toBe('rotate(0 250 250)');
    expect(stubs[2].attributes('data-transform')).toBe('rotate(0 250 250)');
  });
});
