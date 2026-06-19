import type { Flight } from '@/types/flight';
import type { AirlineSummary } from '@/types/flight';
import { FlightCard } from './FlightCard';
import { AirlineChips } from './AirlineChips';
import { SortControls } from './SortControls';
import { FilterPanel } from './FilterPanel';
import { ResultsSummary } from './ResultsSummary';
import { FlightCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { useSearchStore } from '@/store/useSearchStore';
interface FlightResultsProps {
  flights: Flight[];
  airlines: AirlineSummary[];
  isLoading: boolean;
  error: string | null;
  onBook: (flight: Flight) => void;
  onRetry: () => void;
}
export function FlightResults({
  flights,
  airlines,
  isLoading,
  error,
  onBook,
  onRetry,
}: FlightResultsProps) {
  const { resetFilters } = useSearchStore();
  // Count unique airlines in current results
  const uniqueAirlines = new Set(flights.map((f) => f.airline.code));
  return (
    <section className="space-y-4" aria-label="Flight search results">
      {/* Airline chips carousel */}
      <AirlineChips airlines={airlines} />
      {/* Controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <SortControls />
        </div>
        <FilterPanel />
      </div>
      {/* Results summary */}
      {!isLoading && !error && flights.length > 0 && (
        <ResultsSummary
          flightCount={flights.length}
          airlineCount={uniqueAirlines.size}
        />
      )}
      {/* Flight cards list */}
      {isLoading ? (
        <div className="space-y-3" aria-busy="true" aria-label="Loading flights">
          {Array.from({ length: 5 }).map((_, i) => (
            <FlightCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : flights.length === 0 ? (
        <EmptyState
          action={{
            label: 'Clear All Filters',
            onClick: resetFilters,
          }}
        />
      ) : (
        <div className="space-y-3">
          {flights.map((flight, index) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              index={index}
              onBook={onBook}
            />
          ))}
        </div>
      )}
    </section>
  );
}