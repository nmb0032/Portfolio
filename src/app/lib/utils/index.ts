// Front-matter dates may be parsed by gray-matter as either strings or Date objects.
export function formatDate(date: string | Date): string {
  if (date instanceof Date) {
    return date.toISOString().slice(0, 10);
  }
  return String(date).slice(0, 10);
}

export function hostname(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}
