/** Format minutes into "Xh Ym" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Format price to USD currency string */
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format price with decimals */
export function formatPriceDecimal(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Get stop label text */
export function getStopLabel(count: number): string {
  if (count === 0) return 'Direct';
  if (count === 1) return '1 Stop';
  return `${count} Stops`;
}

/** Generate a random PNR code */
export function generatePNR(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}

/** Generate a booking ID */
export function generateBookingId(): string {
  return `BK-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

/** Delay utility for simulating API latency */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Get hour from time string "HH:mm" */
export function getHourFromTime(time: string): number {
  const parts = time.split(':');
  return parseInt(parts[0] ?? '0', 10);
}

/** Classnames merge utility */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
