import { vi } from 'vitest';

vi.mock('./src/aircraft-icon.ts', () => ({
  installAircraftLayer: () => {},
}));

vi.mock('leaflet', () => {
  function extendable(proto: object) {
    const Base: any = function () {};
    Base.prototype = proto;
    Base.extend = function (spec: Record<string, unknown>) {
      const Child: any = function (this: unknown, ...args: unknown[]) {
        const init = spec.initialize as ((this: unknown, ...a: unknown[]) => void) | undefined;
        if (init) init.apply(this, args);
      };
      Child.prototype = Object.create(Base.prototype);
      Object.assign(Child.prototype, spec);
      return Child;
    };
    return Base;
  }

  const L: Record<string, unknown> = {
    Util: {
      setOptions() {},
      template(s: string, ctx: Record<string, string>) {
        return s.replace(/\{heading\}/g, ctx.heading ?? '');
      },
    },
    DivIcon: extendable({ initialize() {} }),
    Marker: extendable({
      initialize() {},
      onAdd() {},
      onRemove() {},
      setLatLng() {},
      setIcon() {},
    }),
    map: vi.fn(() => {
      const m = {
        setView() {
          return m;
        },
        remove: vi.fn(),
        getCenter: () => ({ lat: 53.5, lng: 10 }),
        getSize: () => ({ x: 100, y: 100 }),
        project: () => ({
          subtract: () => ({ x: 0, y: 0 }),
        }),
        unproject: () => ({ lat: 0, lng: 0 }),
      };
      return m;
    }),
    aircraft: vi.fn(() => ({
      addTo: vi.fn(),
      setLatLng: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({ addTo: () => ({}) })),
  };

  return { default: L };
});
