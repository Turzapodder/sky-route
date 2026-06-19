export interface AirportInfo {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const AIRPORTS: AirportInfo[] = [
  { code: 'DAC', city: 'Dhaka', country: 'Bangladesh', name: 'Hazrat Shahjalal International Airport' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },
  { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International Airport' },
  { code: 'JED', city: 'Jeddah', country: 'Saudi Arabia', name: 'King Abdulaziz International Airport' },
  { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia', name: 'King Khalid International Airport' },
  { code: 'KWI', city: 'Kuwait City', country: 'Kuwait', name: 'Kuwait International Airport' },
  { code: 'BAH', city: 'Bahrain', country: 'Bahrain', name: 'Bahrain International Airport' },
  { code: 'CGP', city: 'Chittagong', country: 'Bangladesh', name: 'Shah Amanat International Airport' },
  { code: 'MCT', city: 'Muscat', country: 'Oman', name: 'Muscat International Airport' },
  { code: 'ATH', city: 'Athens', country: 'Greece', name: 'Athens International Airport' },
  { code: 'LHR', city: 'London', country: 'United Kingdom', name: 'Heathrow Airport' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Changi Airport' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport' },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', name: 'KLIA Airport' },
  { code: 'DEL', city: 'New Delhi', country: 'India', name: 'Indira Gandhi International Airport' },
  { code: 'BOM', city: 'Mumbai', country: 'India', name: 'Chhatrapati Shivaji International Airport' },
  { code: 'JFK', city: 'New York', country: 'United States', name: 'John F. Kennedy International Airport' },
  { code: 'CXB', city: "Cox's Bazar", country: 'Bangladesh', name: "Cox's Bazar Airport" },
];

export function searchAirports(query: string): AirportInfo[] {
  if (!query.trim()) return AIRPORTS.slice(0, 8);
  const lower = query.toLowerCase();
  return AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().includes(lower) ||
      a.city.toLowerCase().includes(lower) ||
      a.country.toLowerCase().includes(lower) ||
      a.name.toLowerCase().includes(lower)
  ).slice(0, 8);
}

export function getAirportByCode(code: string): AirportInfo | undefined {
  return AIRPORTS.find((a) => a.code === code);
}
