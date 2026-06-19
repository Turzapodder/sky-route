import { useCallback, useEffect } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
import { useFlightStore } from '@/store/useFlightStore';
import { getAllFlights } from '@/api/flightService';

export function useFlightSearch() {
  const { searchParams, filters, sortOption, hasSearched, setHasSearched } = useSearchStore();
  const { fetchFlights, setAllFlights, isLoading, error, flights, allFlights, airlines, priceRange } =
    useFlightStore();

  // Initial load of all flights data
  useEffect(() => {
    if (allFlights.length === 0) {
      getAllFlights().then((data) => {
        setAllFlights(data.flights);
      });
    }
  }, [allFlights.length, setAllFlights]);

  // Re-fetch when filters or sort change (only if already searched)
  useEffect(() => {
    if (hasSearched) {
      fetchFlights(searchParams, filters, sortOption);
    }
  }, [filters, sortOption, hasSearched, fetchFlights, searchParams]);

  const handleSearch = useCallback(() => {
    setHasSearched(true);
    fetchFlights(searchParams, filters, sortOption);
  }, [searchParams, filters, sortOption, fetchFlights, setHasSearched]);

  return {
    flights,
    allFlights,
    airlines,
    priceRange,
    isLoading,
    error,
    hasSearched,
    handleSearch,
  };
}
