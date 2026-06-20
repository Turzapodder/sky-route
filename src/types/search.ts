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
export interface PassengerDetails {
  adults: number;
  children: number;
  infants: number;
}
export enum CabinClass {
  ECONOMY = 'Economy',
  PREMIUM = 'Premium Economy',
  BUSINESS = 'Business',
  FIRST = 'First',
}
export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number; // Total count for convenience
  passengerDetails: PassengerDetails;
  cabinClass: CabinClass;
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