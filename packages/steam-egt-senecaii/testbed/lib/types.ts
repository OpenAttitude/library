import type { Ref } from 'vue';

/** One slider + ref binding for the instrument testbed sidebar. */
export interface TestbedControlItem {
  name: string;
  min: number;
  max: number;
  step: number;
  ref: Ref<number>;
}
