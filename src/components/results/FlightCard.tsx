import { useState } from 'react';
import { ChevronDown, ChevronUp, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Flight } from '@/types/flight';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDuration, formatPriceDecimal, getStopLabel, cn } from '@/lib/utils';
import { getAirportByCode } from '@/lib/airports';
interface FlightCardProps {
  flight: Flight;
  index: number;
  onBook: (flight: Flight) => void;
}
const AIRLINE_COLORS: Record<string, string> = {
  TK: 'bg-red-600',
  EK: 'bg-red-700',
  QR: 'bg-purple-800',
  SV: 'bg-emerald-700',
  BG: 'bg-green-700',
  GF: 'bg-amber-600',
  KU: 'bg-blue-700',
};
export function FlightCard({ flight, index, onBook }: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const originInfo = getAirportByCode(flight.departure.airport);
  const destInfo = getAirportByCode(flight.arrival.airport);
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white rounded-xl border border-gray-100 flight-card-hover overflow-hidden"
      aria-label={`${flight.airline.name} flight ${flight.flight_number}, ${formatPriceDecimal(flight.pricing.total_fare)}`}
    >
      <div className="p-4 sm:p-5">
        {/* Main content row */}
        <div className="flex flex-col gap-4">
          {/* Airline info */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0',
                AIRLINE_COLORS[flight.airline.code] ?? 'bg-gray-600'
              )}
              aria-hidden="true"
            >
              {flight.airline.code}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{flight.airline.name}</p>
              <p className="text-xs text-gray-500">{flight.flight_number}</p>
            </div>
          </div>
          {/* Flight route visualization */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Departure */}
            <div className="text-left sm:text-center flex-shrink-0">
              <p className="text-base sm:text-lg font-bold text-gray-900">{flight.departure.time}</p>
              <p className="text-xs text-gray-500 truncate max-w-[90px] sm:max-w-none">
                {originInfo ? `${originInfo.city} (${flight.departure.airport})` : flight.departure.airport}
              </p>
            </div>
            {/* Route line */}
            <div className="flex-1 flex flex-col items-center gap-1 min-w-[60px]">
              <p className="text-[11px] text-gray-400 font-medium">{formatDuration(flight.duration_minutes)}</p>
              <div className="w-full relative">
                <div className="route-line w-full">
                  {flight.stops_details.map((_, i) => (
                    <span
                      key={i}
                      className="route-line-stop"
                      style={{ left: `${((i + 1) / (flight.stops_count + 1)) * 100}%` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className={cn(
                'text-[11px] font-medium',
                flight.stops_count === 0 ? 'text-brand' : 'text-amber-600'
              )}>
                {getStopLabel(flight.stops_count)}
                {flight.stops_count > 0 && (
                  <span className="text-gray-400 hidden sm:inline"> · {flight.stops_details.join(', ')}</span>
                )}
              </p>
            </div>
            {/* Arrival */}
            <div className="text-right sm:text-center flex-shrink-0">
              <p className="text-base sm:text-lg font-bold text-gray-900">{flight.arrival.time}</p>
              <p className="text-xs text-gray-500 truncate max-w-[90px] sm:max-w-none">
                {destInfo ? `${destInfo.city} (${flight.arrival.airport})` : flight.arrival.airport}
              </p>
            </div>
          </div>
          {/* Pricing */}
          <div className="flex items-center justify-between sm:block sm:text-right flex-shrink-0">
            <p className="text-sm text-gray-500">
              Total Fare: <span className="font-bold text-gray-900">{formatPriceDecimal(flight.pricing.total_fare)}</span>
            </p>
            <div className="flex gap-3 sm:block">
              <p className="text-xs text-gray-400">
                Commission: <span className="text-brand font-medium">{formatPriceDecimal(flight.pricing.commission)}</span>
              </p>
              <p className="text-xs text-gray-500">
                Agent Fare: <span className="font-semibold text-gray-700">{formatPriceDecimal(flight.pricing.agent_fare)}</span>
              </p>
            </div>
          </div>
        </div>
        {/* Tags & Actions row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-dashed border-gray-200">
          {/* Tags */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {flight.tags.is_cheapest && <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">Cheapest</span>}
            {flight.tags.is_fastest && <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">Fastest</span>}
            {flight.tags.is_refundable ? (
              <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">Refundable</span>
            ) : (
              <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">Non Refundable</span>
            )}
            <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">Book & Hold</span>
            {flight.tags.allow_partial_payment && (
              <span className="text-[11px] font-semibold text-red-500 whitespace-nowrap">Partial Payment</span>
            )}
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              aria-expanded={isExpanded}
              aria-controls={`flight-details-${flight.id}`}
            >
              Flight Details
              {isExpanded ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
            <Button size="sm" onClick={() => onBook(flight)} className="bg-gray-900 text-white hover:bg-gray-800 px-6">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      {/* Expandable details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`flight-details-${flight.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Flight Info</h4>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Airline:</span> {flight.airline.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Flight:</span> {flight.flight_number}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Duration:</span> {formatDuration(flight.duration_minutes)}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Stops:</span> {getStopLabel(flight.stops_count)}
                      {flight.stops_details.length > 0 && ` (${flight.stops_details.join(' → ')})`}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Route</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full border-2 border-brand bg-white" />
                      <div className="w-0.5 h-12 bg-gray-200" />
                      <div className="w-3 h-3 rounded-full bg-brand" />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{flight.departure.time} · {flight.departure.airport}</p>
                        <p className="text-xs text-gray-500">{originInfo?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{flight.arrival.time} · {flight.arrival.airport}</p>
                        <p className="text-xs text-gray-500">{destInfo?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Baggage & Class</h4>
                  <div className="space-y-1.5">
                    <p className="text-sm text-gray-700">
                      <span className="text-gray-500">Class:</span> Economy
                    </p>
                    <p className="text-sm text-gray-700">
                      <Plane className="inline w-3.5 h-3.5 text-gray-400 mr-1" aria-hidden="true" />
                      Cabin: 7 kg
                    </p>
                    <p className="text-sm text-gray-700">
                      <Plane className="inline w-3.5 h-3.5 text-gray-400 mr-1" aria-hidden="true" />
                      Check-in: 20 kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}