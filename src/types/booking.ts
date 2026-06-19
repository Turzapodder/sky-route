export enum BookingStep {
  SUMMARY = 'summary',
  PASSENGER_DETAILS = 'passenger_details',
  CONFIRMATION = 'confirmation',
}
export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}
export interface BookingRequest {
  flightId: string;
  passengers: PassengerInfo[];
  totalAmount: number;
}
export interface BookingConfirmation {
  pnr: string;
  bookingId: string;
  status: 'confirmed' | 'pending';
  flightId: string;
  passengers: PassengerInfo[];
  totalAmount: number;
  bookedAt: string;
}