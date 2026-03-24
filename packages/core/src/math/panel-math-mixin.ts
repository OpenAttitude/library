import './math-global';

/**
 * Vue Options API mixin: `mixins: [panelMathMixin]` adds `this.clamp` / `this.interpolate`
 * via `Math` (call `installPanelMath()` from app bootstrap first).
 */
export const panelMathMixin = {
  methods: {
    clamp(val: number, min: number, max: number) {
      return Math.clamp(val, min, max);
    },
    interpolate(val: number, table: [number, number][]) {
      return Math.interpolate(val, table);
    },
  },
};
