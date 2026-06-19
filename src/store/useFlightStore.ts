import { create } from 'zustand';
import type { Flight, AirlineSummary } from '@/types/flight';
import { searchFlights, getAirlineSummaries, getPriceRange } from '@/api/flightService';
import type { SearchParams, FilterState } from '@/types/search';
import { SortOption } from '@/types/search';
interface FlightState {
  flights: Flight[];
  allFlights: Flight[];
  airlines: AirlineSummary[];
  isLoading: boolean;
  error: string | null;
  priceRange: [number, number];
  fetchFlights: (params: SearchParams, filters: FilterState, sort: SortOption) => Promise<void>;
  setAllFlights: (flights: Flight[]) => void;
}
export const useFlightStore = create<FlightState>((set) => ({
  flights: [],
  allFlights: [],
  airlines: [],
  isLoading: false,
  error: null,
  priceRange: [0, 0],
  fetchFlights: async (params, filters, sort) => {
    set({ isLoading: true, error: null });
    try {
      const result = await searchFlights(params, filters, sort);
      set({
        flights: result.flights,
        isLoading: false,
      });
    } catch {
      set({
        error: 'Failed to fetch flights. Please try again.',
        isLoading: false,
      });
    }
  },
  setAllFlights: (flights) => {
    const airlines = getAirlineSummaries(flights);
    const priceRange = getPriceRange(flights);
    set({ allFlights: flights, airlines, priceRange });
  },
}));