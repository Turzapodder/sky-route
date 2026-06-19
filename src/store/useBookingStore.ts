import { create } from 'zustand';
import type { Flight } from '@/types/flight';
import { BookingStep, type PassengerInfo, type BookingConfirmation } from '@/types/booking';
import { submitBooking as submitBookingApi } from '@/api/bookingService';
interface BookingState {
  selectedFlight: Flight | null;
  step: BookingStep;
  passengers: PassengerInfo[];
  confirmation: BookingConfirmation | null;
  isSubmitting: boolean;
  error: string | null;
  isOpen: boolean;
  openBooking: (flight: Flight, passengerCount: number) => void;
  closeBooking: () => void;
  setStep: (step: BookingStep) => void;
  setPassengers: (passengers: PassengerInfo[]) => void;
  submitBooking: () => Promise<void>;
  reset: () => void;
}
export const useBookingStore = create<BookingState>((set, get) => ({
  selectedFlight: null,
  step: BookingStep.SUMMARY,
  passengers: [],
  confirmation: null,
  isSubmitting: false,
  error: null,
  isOpen: false,
  openBooking: (flight, passengerCount) => {
    const emptyPassengers: PassengerInfo[] = Array.from({ length: passengerCount }, () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
    }));
    set({
      selectedFlight: flight,
      step: BookingStep.SUMMARY,
      passengers: emptyPassengers,
      confirmation: null,
      isSubmitting: false,
      error: null,
      isOpen: true,
    });
  },
  closeBooking: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  setPassengers: (passengers) => set({ passengers }),
  submitBooking: async () => {
    const { selectedFlight, passengers } = get();
    if (!selectedFlight) return;
    set({ isSubmitting: true, error: null });
    try {
      const confirmation = await submitBookingApi({
        flightId: selectedFlight.id,
        passengers,
        totalAmount: selectedFlight.pricing.total_fare,
      });
      set({
        confirmation,
        step: BookingStep.CONFIRMATION,
        isSubmitting: false,
      });
    } catch {
      set({
        error: 'Booking failed. Please try again.',
        isSubmitting: false,
      });
    }
  },
  reset: () =>
    set({
      selectedFlight: null,
      step: BookingStep.SUMMARY,
      passengers: [],
      confirmation: null,
      isSubmitting: false,
      error: null,
      isOpen: false,
    }),
}));