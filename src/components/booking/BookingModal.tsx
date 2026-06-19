import { BookingStep } from '@/types/booking';
import { useBookingStore } from '@/store/useBookingStore';
import { useSearchStore } from '@/store/useSearchStore';
import { Modal } from '@/components/ui/Modal';
import { FlightSummary } from './FlightSummary';
import { PassengerForm } from './PassengerForm';
import { BookingConfirmation } from './BookingConfirmation';
import { cn } from '@/lib/utils';
const steps = [
  { key: BookingStep.SUMMARY, label: 'Flight Summary' },
  { key: BookingStep.PASSENGER_DETAILS, label: 'Passenger Details' },
  { key: BookingStep.CONFIRMATION, label: 'Confirmation' },
];
export function BookingModal() {
  const {
    isOpen,
    closeBooking,
    selectedFlight,
    step,
    setStep,
    setPassengers,
    submitBooking,
    isSubmitting,
    confirmation,
    reset,
  } = useBookingStore();
  const { searchParams } = useSearchStore();
  if (!selectedFlight) return null;
  const currentStepIndex = steps.findIndex((s) => s.key === step);
  function handlePassengerSubmit(data: { passengers: Array<{ firstName: string; lastName: string; email: string; phone: string; dateOfBirth: string }> }) {
    setPassengers(data.passengers);
    submitBooking();
  }
  function handleSearchMore() {
    reset();
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={step === BookingStep.CONFIRMATION ? reset : closeBooking}
      title="Book Flight"
      size="lg"
    >
      {/* Progress bar */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                    i <= currentStepIndex
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium hidden sm:block',
                    i <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'h-px flex-1 min-w-4',
                    i < currentStepIndex ? 'bg-gray-900' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Step content */}
      {step === BookingStep.SUMMARY && (
        <FlightSummary
          flight={selectedFlight}
          passengers={searchParams.passengers}
          onContinue={() => setStep(BookingStep.PASSENGER_DETAILS)}
        />
      )}
      {step === BookingStep.PASSENGER_DETAILS && (
        <PassengerForm
          passengerCount={searchParams.passengers}
          onSubmit={handlePassengerSubmit}
          onBack={() => setStep(BookingStep.SUMMARY)}
          isSubmitting={isSubmitting}
        />
      )}
      {step === BookingStep.CONFIRMATION && confirmation && (
        <BookingConfirmation
          confirmation={confirmation}
          flight={selectedFlight}
          onSearchMore={handleSearchMore}
        />
      )}
    </Modal>
  );
}