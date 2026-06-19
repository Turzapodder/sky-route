export interface Airline {
  code: string;
  name: string;
  logo_url: string;
}
export interface FlightEndpoint {
  airport: string;
  time: string;
  timestamp: number;
}
export interface Pricing {
  total_fare: number;
  commission: number;
  agent_fare: number;
}
export interface FlightTags {
  is_cheapest: boolean;
  is_fastest: boolean;
  is_refundable: boolean;
  allow_partial_payment: boolean;
}
export interface Flight {
  id: string;
  airline: Airline;
  flight_number: string;
  departure: FlightEndpoint;
  arrival: FlightEndpoint;
  duration_minutes: number;
  stops_count: number;
  stops_details: string[];
  pricing: Pricing;
  tags: FlightTags;
}
export interface SearchMeta {
  origin: string;
  destination: string;
  departure_date: string;
  passengers: number;
  currency: string;
  total_results: number;
}
export interface FlightsData {
  search_meta: SearchMeta;
  flights: Flight[];
}
/** Derived type for airline chip carousel display */
export interface AirlineSummary {
  code: string;
  name: string;
  logo_url: string;
  flightCount: number;
  minPrice: number;
}