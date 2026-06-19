import { useState, useEffect } from 'react';
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
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
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
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Count unique airlines in current results
  const uniqueAirlines = new Set(flights.map((f) => f.airline.code));

  // Reset pagination when flights array changes (e.g. new search or filters)
  useEffect(() => {
    setVisibleCount(10);
  }, [flights]);

  const hasMore = visibleCount < flights.length;
  const visibleFlights = flights.slice(0, visibleCount);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '100px',
    enabled: hasMore,
  });

  useEffect(() => {
    if (isIntersecting && hasMore) {
      // Simulate network delay for a production-grade feel
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 10, flights.length));
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isIntersecting, hasMore, flights.length]);
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
          {visibleFlights.map((flight, index) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              index={index}
              onBook={onBook}
            />
          ))}
          
          {/* Intersection Observer Target */}
          {hasMore && (
            <div ref={targetRef} className="py-4 space-y-3">
              {Array.from({ length: Math.min(10, flights.length - visibleCount) }).map((_, i) => (
                <FlightCardSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}