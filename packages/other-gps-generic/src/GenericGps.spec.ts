import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import GenericGps from './GenericGps.vue';

describe('GenericGps', () => {
  it('renders the map mount target', () => {
    const w = mount(GenericGps, {
      props: {
        latitudeDeg: 50,
        longitudeDeg: 10,
        headingDeg: 0,
        zoomLevel: 6,
      },
    });
    const el = w.find('.other-gps-generic__map');
    expect(el.exists()).toBe(true);
    expect(el.text()).toContain('GPS');
  });
});
