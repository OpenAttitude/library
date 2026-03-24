import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Altimeter20kFt from './Altimeter20kFt.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountAlt(props: {
  indicatedAltitudeFt?: number | null;
  settingHpa?: number | null;
} = {}) {
  return mount(Altimeter20kFt, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('Altimeter20kFt', () => {
  it('scales 10k drum and pointers from altitude', () => {
    const w = mountAlt({ indicatedAltitudeFt: 10000 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[2].attributes('data-transform')).toBe('rotate(36 250 250)');
    expect(w.find('#rect157').attributes('transform')).toBe('rotate(3600 250 250)');
    expect(w.find('#path157').attributes('transform')).toBe('rotate(360 250 250)');
  });

  it('maps baro setting to Kollsman rotation', () => {
    const w = mountAlt({ settingHpa: 1013.25 });
    const v = (1015 - 1013.25) * 3.0;
    expect(w.findAll('.prerendered-stub')[0].attributes('data-transform')).toBe(`rotate(${v} 250 250)`);
  });

  it('treats null altitude as 0 ft', () => {
    const w = mountAlt({ indicatedAltitudeFt: null, settingHpa: null });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[2].attributes('data-transform')).toBe('rotate(0 250 250)');
    expect(w.find('#rect157').attributes('transform')).toBe('rotate(0 250 250)');
  });
});
