import type { BookingRequest, BookingConfirmation } from '@/types/booking';
import { delay, generatePNR, generateBookingId } from '@/lib/utils';

/** Simulates a booking submission API call */
export async function submitBooking(
  request: BookingRequest
): Promise<BookingConfirmation> {
  // Simulate network latency for booking
  await delay(1500 + Math.random() * 500);

  const confirmation: BookingConfirmation = {
    pnr: generatePNR(),
    bookingId: generateBookingId(),
    status: 'confirmed',
    flightId: request.flightId,
    passengers: request.passengers,
    totalAmount: request.totalAmount,
    bookedAt: new Date().toISOString(),
  };

  return confirmation;
}
