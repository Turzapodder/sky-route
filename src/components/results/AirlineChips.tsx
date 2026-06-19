import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AirlineSummary } from '@/types/flight';
import { useSearchStore } from '@/store/useSearchStore';
import { formatPriceDecimal } from '@/lib/utils';
import { cn } from '@/lib/utils';
interface AirlineChipsProps {
  airlines: AirlineSummary[];
}
/** Color palette for airline logo fallbacks */
const AIRLINE_COLORS: Record<string, string> = {
  TK: 'bg-red-600 text-white',
  EK: 'bg-red-700 text-white',
  QR: 'bg-purple-800 text-white',
  SV: 'bg-emerald-700 text-white',
  BG: 'bg-green-700 text-white',
  GF: 'bg-amber-600 text-white',
  KU: 'bg-blue-700 text-white',
};
export function AirlineChips({ airlines }: AirlineChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { filters, toggleAirlineFilter } = useSearchStore();
  function scroll(direction: 'left' | 'right') {
    if (scrollRef.current) {
      const amount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  }
  if (airlines.length === 0) return null;
  return (
    <div className="relative" role="region" aria-label="Filter by airline">
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Scroll airlines left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {/* Chips container */}
      <div
        ref={scrollRef}
        className="chips-scroll flex items-center gap-3 overflow-x-auto px-10 py-2"
      >
        {airlines.map((airline) => {
          const isActive = filters.airlines.includes(airline.code);
          return (
            <button
              key={airline.code}
              onClick={() => toggleAirlineFilter(airline.code)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all duration-200 min-w-fit',
                isActive
                  ? 'border-brand bg-brand/5 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              )}
              aria-pressed={isActive}
              aria-label={`Filter by ${airline.name}`}
            >
              {/* Airline logo */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full airline-logo-fallback flex-shrink-0',
                  AIRLINE_COLORS[airline.code] ?? 'bg-gray-600 text-white'
                )}
              >
                {airline.code}
              </div>
              <div className="text-left">
                <p className={cn('text-xs font-semibold', isActive ? 'text-brand' : 'text-gray-800')}>
                  {airline.name}
                </p>
                <p className={cn('text-xs', isActive ? 'text-brand/70' : 'text-gray-500')}>
                  USD {formatPriceDecimal(airline.minPrice)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Scroll airlines right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}