export enum SortOption {
  CHEAPEST = 'cheapest',
  FASTEST = 'fastest',
  DEPARTURE = 'departure',
  DURATION = 'duration',
}
export enum TripType {
  ONE_WAY = 'one_way',
  ROUND_TRIP = 'round_trip',
  MULTI_CITY = 'multi_city',
}
export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number;
  tripType: TripType;
}
export interface FilterState {
  airlines: string[];
  maxStops: number | null; // null = any
  priceRange: [number, number] | null;
  refundableOnly: boolean;
  departureTimeRange: [number, number] | null; // hours 0-24
}
export type ViewMode = 'list' | 'table';
export const DEFAULT_FILTERS: FilterState = {
  airlines: [],
  maxStops: null,
  priceRange: null,
  refundableOnly: false,
  departureTimeRange: null,
};