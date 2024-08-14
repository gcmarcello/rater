export function minutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
}

export function numberToText(num: number) {
  if (num < 1000) return num;
  if (num <= 1000000) return Math.round(num / 1000) + "mil";
  if (num <= 1000000000) return Math.round(num / 1000000) + "milhões";
}
