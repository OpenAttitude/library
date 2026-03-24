import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GenericClock from './GenericClock.vue';

const prerenderedStub = {
  props: ['href', 'transform'],
  template:
    '<g class="prerendered-stub" :data-href="href" :data-transform="transform ?? \'\'" />',
};

function mountClock(props: { utcDaySeconds?: number | null } = {}) {
  return mount(GenericClock, {
    props,
    global: {
      stubs: { PrerenderedSvgImage: prerenderedStub },
    },
  });
}

describe('GenericClock', () => {
  it('maps utc day seconds to hand rotations', () => {
    const w = mountClock({ utcDaySeconds: 60 });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs[1].attributes('data-transform')).toBe('rotate(0.5 250 250)');
    expect(stubs[2].attributes('data-transform')).toBe('rotate(6 250 250)');
    expect(stubs[3].attributes('data-transform')).toBe('rotate(360 250 250)');
  });

  it('treats null like 0 seconds', () => {
    const w = mountClock({ utcDaySeconds: null });
    const stubs = w.findAll('.prerendered-stub');
    expect(stubs.map((s) => s.attributes('data-transform'))).toEqual([
      '',
      'rotate(0 250 250)',
      'rotate(0 250 250)',
      'rotate(0 250 250)',
    ]);
  });
});
