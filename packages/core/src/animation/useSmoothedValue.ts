import { useTransition, TransitionPresets } from '@vueuse/core';
import type { MaybeRefOrGetter } from 'vue';

/**
 * Returns a smoothed version of a numeric value using easeOutExpo easing.
 * Works for any continuously-updating number: gauge needles, digital readouts, etc.
 *
 * @param source  Reactive numeric source (ref, computed, or getter)
 * @param duration  Transition duration in ms; 0 = instant (no easing)
 */
export function useSmoothedValue(
  source: MaybeRefOrGetter<number>,
  duration: MaybeRefOrGetter<number>,
) {
  return useTransition(source, {
    duration,
    transition: TransitionPresets.easeOutExpo,
  });
}
