import { motion } from 'framer-motion';
import { CheckCircle, Copy, Search, Plane } from 'lucide-react';
import { useState } from 'react';
import type { BookingConfirmation as Confirmation } from '@/types/booking';
import type { Flight } from '@/types/flight';
import { Button } from '@/components/ui/Button';
import { formatPriceDecimal, formatDuration } from '@/lib/utils';
import { getAirportByCode } from '@/lib/airports';
interface BookingConfirmationProps {
  confirmation: Confirmation;
  flight: Flight;
  onSearchMore: () => void;
}
export function BookingConfirmation({ confirmation, flight, onSearchMore }: BookingConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const originInfo = getAirportByCode(flight.departure.airport);
  const destInfo = getAirportByCode(flight.arrival.airport);
  function handleCopyPNR() {
    navigator.clipboard.writeText(confirmation.pnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="p-6 space-y-6">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="flex flex-col items-center text-center py-4"
      >
        <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CheckCircle className="w-12 h-12 text-brand" />
          </motion.div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
        <p className="text-sm text-gray-500">Your flight has been successfully booked</p>
      </motion.div>
      {/* PNR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 rounded-xl p-5 text-center"
      >
        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
          Booking Reference (PNR)
        </p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl font-bold text-gray-900 tracking-[0.2em] font-mono">
            {confirmation.pnr}
          </span>
          <button
            onClick={handleCopyPNR}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Copy PNR to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <p className="text-xs text-brand mt-2 animate-[fadeIn_0.2s_ease-out]">
            Copied to clipboard!
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Booking ID: {confirmation.bookingId}
        </p>
      </motion.div>
      {/* Flight summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 rounded-xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <Plane className="w-5 h-5 text-brand" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {flight.airline.name} · {flight.flight_number}
            </p>
            <p className="text-xs text-gray-500">
              {formatDuration(flight.duration_minutes)} · Economy
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">{flight.departure.time}</p>
            <p className="text-xs text-gray-500">{originInfo?.city} ({flight.departure.airport})</p>
          </div>
          <div className="text-center text-xs text-gray-400">→</div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">{flight.arrival.time}</p>
            <p className="text-xs text-gray-500">{destInfo?.city} ({flight.arrival.airport})</p>
          </div>
        </div>
      </motion.div>
      {/* Passenger & payment info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Passengers</span>
          <span className="font-medium text-gray-900">{confirmation.passengers.length}</span>
        </div>
        {confirmation.passengers.map((p, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-500">Passenger {i + 1}</span>
            <span className="font-medium text-gray-900">{p.firstName} {p.lastName}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">Total Paid</span>
            <span className="text-lg font-bold text-brand">
              {formatPriceDecimal(confirmation.totalAmount * confirmation.passengers.length)}
            </span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="inline-flex items-center gap-1.5 text-brand font-medium">
            <span className="w-2 h-2 rounded-full bg-brand animate-[pulseSoft_2s_infinite]" />
            Confirmed
          </span>
        </div>
      </motion.div>
      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" onClick={onSearchMore} leftIcon={<Search className="w-4 h-4" />}>
          Search More Flights
        </Button>
      </div>
    </div>
  );
}