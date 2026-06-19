import type { Flight, FlightsData, AirlineSummary } from '@/types/flight';
import type { SearchParams, FilterState, SortOption } from '@/types/search';
import { delay, getHourFromTime } from '@/lib/utils';
import flightsJson from '@/data/flights.json';

const data = flightsJson as FlightsData;

/** Simulates an async flight search API call */
export async function searchFlights(
  _params: SearchParams,
  filters: FilterState,
  sortBy: SortOption
): Promise<{ flights: Flight[]; totalCount: number }> {
  // Simulate network latency
  await delay(800 + Math.random() * 400);

  let flights = [...data.flights];

  // Apply filters
  flights = applyFilters(flights, filters);

  // Apply sorting
  flights = applySorting(flights, sortBy);

  return {
    flights,
    totalCount: flights.length,
  };
}

/** Get all flights without filtering (for initial load) */
export async function getAllFlights(): Promise<FlightsData> {
  await delay(600 + Math.random() * 400);
  return data;
}

/** Extract unique airline summaries from flights data */
export function getAirlineSummaries(flights: Flight[]): AirlineSummary[] {
  const airlineMap = new Map<string, AirlineSummary>();

  for (const flight of flights) {
    const existing = airlineMap.get(flight.airline.code);
    if (existing) {
      existing.flightCount += 1;
      existing.minPrice = Math.min(existing.minPrice, flight.pricing.total_fare);
    } else {
      airlineMap.set(flight.airline.code, {
        code: flight.airline.code,
        name: flight.airline.name,
        logo_url: flight.airline.logo_url,
        flightCount: 1,
        minPrice: flight.pricing.total_fare,
      });
    }
  }

  return Array.from(airlineMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

/** Apply filter state to flight list */
function applyFilters(flights: Flight[], filters: FilterState): Flight[] {
  let result = flights;

  // Filter by airline
  if (filters.airlines.length > 0) {
    result = result.filter((f) => filters.airlines.includes(f.airline.code));
  }

  // Filter by stops
  if (filters.maxStops !== null) {
    result = result.filter((f) => f.stops_count <= filters.maxStops!);
  }

  // Filter by price range
  if (filters.priceRange !== null) {
    const [min, max] = filters.priceRange;
    result = result.filter(
      (f) => f.pricing.total_fare >= min && f.pricing.total_fare <= max
    );
  }

  // Filter by refundable
  if (filters.refundableOnly) {
    result = result.filter((f) => f.tags.is_refundable);
  }

  // Filter by departure time range
  if (filters.departureTimeRange !== null) {
    const [startHour, endHour] = filters.departureTimeRange;
    result = result.filter((f) => {
      const hour = getHourFromTime(f.departure.time);
      return hour >= startHour && hour < endHour;
    });
  }

  return result;
}

/** Apply sort option to flight list */
function applySorting(flights: Flight[], sortBy: SortOption): Flight[] {
  const sorted = [...flights];
  switch (sortBy) {
    case 'cheapest':
      return sorted.sort((a, b) => a.pricing.total_fare - b.pricing.total_fare);
    case 'fastest':
      return sorted.sort((a, b) => a.duration_minutes - b.duration_minutes);
    case 'departure':
      return sorted.sort((a, b) => a.departure.timestamp - b.departure.timestamp);
    case 'duration':
      return sorted.sort((a, b) => a.duration_minutes - b.duration_minutes);
    default:
      return sorted;
  }
}

/** Get the price range from all flights */
export function getPriceRange(flights: Flight[]): [number, number] {
  if (flights.length === 0) return [0, 0];
  const prices = flights.map((f) => f.pricing.total_fare);
  return [Math.min(...prices), Math.max(...prices)];
}

/** Get search metadata */
export function getSearchMeta() {
  return data.search_meta;
}
