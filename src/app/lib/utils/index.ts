export function isoStringToLocalDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString();
}
