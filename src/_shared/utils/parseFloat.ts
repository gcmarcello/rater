export function parseNumber(value: string | number): number {
  return typeof value === "string" ? parseFloat(value) : value;
}
