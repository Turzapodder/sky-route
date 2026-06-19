import { Plane, Clock, MapPin } from 'lucide-react';
import type { Flight } from '@/types/flight';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDuration, formatPriceDecimal, getStopLabel, cn } from '@/lib/utils';
import { getAirportByCode } from '@/lib/airports';
interface FlightSummaryProps {
  flight: Flight;
  passengers: number;
  onContinue: () => void;
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
export function FlightSummary({ flight, passengers, onContinue }: FlightSummaryProps) {
  const originInfo = getAirportByCode(flight.departure.airport);
  const destInfo = getAirportByCode(flight.arrival.airport);
  return (
    <div className="p-6 space-y-6">
      {/* Flight detail card */}
      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        {/* Airline header */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold',
              AIRLINE_COLORS[flight.airline.code] ?? 'bg-gray-600'
            )}
          >
            {flight.airline.code}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{flight.airline.name}</p>
            <p className="text-sm text-gray-500">{flight.flight_number}</p>
          </div>
          <div className="ml-auto flex gap-2">
            {flight.tags.is_refundable && <Badge variant="success">Refundable</Badge>}
            {flight.tags.is_fastest && <Badge variant="info">Fastest</Badge>}
            {flight.tags.is_cheapest && <Badge variant="success">Cheapest</Badge>}
          </div>
        </div>
        {/* Route visualization */}
        <div className="flex items-center gap-6 py-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{flight.departure.time}</p>
            <p className="text-sm text-gray-600 mt-1">{flight.departure.airport}</p>
            <p className="text-xs text-gray-400">{originInfo?.city}</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {formatDuration(flight.duration_minutes)}
            </div>
            <div className="w-full flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" aria-hidden="true" />
              <div className="flex-1 h-px bg-gray-300 relative">
                {flight.stops_details.map((stop, i) => (
                  <span
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500"
                    style={{ left: `${((i + 1) / (flight.stops_count + 1)) * 100}%` }}
                    title={stop}
                  />
                ))}
              </div>
              <Plane className="w-3 h-3 text-brand flex-shrink-0" aria-hidden="true" />
            </div>
            <p className={cn(
              'text-xs font-medium',
              flight.stops_count === 0 ? 'text-brand' : 'text-amber-600'
            )}>
              {getStopLabel(flight.stops_count)}
              {flight.stops_count > 0 && ` via ${flight.stops_details.join(', ')}`}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{flight.arrival.time}</p>
            <p className="text-sm text-gray-600 mt-1">{flight.arrival.airport}</p>
            <p className="text-xs text-gray-400">{destInfo?.city}</p>
          </div>
        </div>
      </div>
      {/* Price breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Price Breakdown</h3>
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Fare × {passengers} passenger{passengers !== 1 ? 's' : ''}</span>
            <span className="font-medium text-gray-900">{formatPriceDecimal(flight.pricing.agent_fare * passengers)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Commission</span>
            <span className="font-medium text-brand">{formatPriceDecimal(flight.pricing.commission * passengers)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="text-lg font-bold text-gray-900">{formatPriceDecimal(flight.pricing.total_fare * passengers)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Continue button */}
      <Button onClick={onContinue} size="lg" className="w-full">
        Continue to Passenger Details
      </Button>
    </div>
  );
}