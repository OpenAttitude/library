import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AttitudeIndicator from './AttitudeIndicator.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountAi(props: { pitchDeg?: number | null; rollDeg?: number | null } = {}) {
  return mount(AttitudeIndicator, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('AttitudeIndicator', () => {
  it('applies roll as negative rotation on roll group', () => {
    const w = mountAi({ rollDeg: 30, pitchDeg: 0 });
    expect(w.find('#roll').attributes('transform')).toBe('rotate(-30 250 250)');
  });

  it('clamps pitch to ±19° for vertical translation', () => {
    const w = mountAi({ pitchDeg: 25, rollDeg: 0 });
    const pitchStub = w.findAll('.prerendered-stub')[1];
    expect(pitchStub.attributes('data-transform')).toBe('translate(0 95)');
  });

});
