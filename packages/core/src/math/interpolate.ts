/** Piecewise linear interpolation through `table` knots `[[x0,y0], [x1,y1], ...]` (x sorted asc). */
export function interpolate(val: number, table: [number, number][]): number {
  if (val <= table[0][0]) return table[0][1];
  const i = table.findIndex((e) => e[0] >= val);
  if (i < 0) return table[table.length - 1][1];
  const ll = table[i - 1][1];
  const hl = table[i][1];
  const l = table[i - 1][0];
  const h = table[i][0];
  return ll + ((hl - ll) * (val - l)) / (h - l);
}
