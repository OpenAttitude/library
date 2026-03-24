export {};

declare global {
  interface Math {
    clamp(val: number, min: number, max: number): number;
    interpolate(val: number, t: [number, number][]): number;
  }
}
