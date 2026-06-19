import { ArrowRight, CalendarDays, Users, Search } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { TripType } from '@/types/search';
import { AirportInput } from './AirportInput';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
interface SearchFormProps {
  onSearch: () => void;
  compact?: boolean;
}
export function SearchForm({ onSearch, compact = false }: SearchFormProps) {
  const { searchParams, setSearchParams } = useSearchStore();
  const tripTypes = [
    { value: TripType.ONE_WAY, label: 'One Way' },
    { value: TripType.ROUND_TRIP, label: 'Round Trip' },
    { value: TripType.MULTI_CITY, label: 'Multi City' },
  ];
  return (
    <div className={cn('bg-white rounded-xl border border-gray-100', compact ? 'p-4' : 'p-5')}>
      {/* Trip Type toggles */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1" role="radiogroup" aria-label="Trip type">
          {tripTypes.map((type) => (
            <button
              key={type.value}
              role="radio"
              aria-checked={searchParams.tripType === type.value}
              onClick={() => setSearchParams({ tripType: type.value })}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
                searchParams.tripType === type.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center',
                    searchParams.tripType === type.value
                      ? 'border-gray-900'
                      : 'border-gray-400'
                  )}
                >
                  {searchParams.tripType === type.value && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                  )}
                </span>
                {type.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Search fields */}
      <div className="flex flex-col lg:flex-row items-stretch gap-3">
        {/* Origin & Destination */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 min-w-0">
            <AirportInput
              label="From"
              value={searchParams.origin}
              onChange={(code) => setSearchParams({ origin: code })}
              id="origin-airport"
            />
          </div>
          <button
            onClick={() =>
              setSearchParams({
                origin: searchParams.destination,
                destination: searchParams.origin,
              })
            }
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all flex-shrink-0"
            aria-label="Swap origin and destination"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex-1 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 min-w-0">
            <AirportInput
              label="To"
              value={searchParams.destination}
              onChange={(code) => setSearchParams({ destination: code })}
              id="destination-airport"
            />
          </div>
        </div>
        {/* Date */}
        <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 lg:w-44">
          <label htmlFor="departure-date" className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
            Departing
          </label>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
            <input
              id="departure-date"
              type="date"
              value={searchParams.departureDate}
              onChange={(e) => setSearchParams({ departureDate: e.target.value })}
              className="text-sm font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full"
            />
          </div>
        </div>
        {/* Passengers */}
        <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 lg:w-52">
          <label htmlFor="passenger-count" className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
            Passengers & Class
          </label>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
            <select
              id="passenger-count"
              value={searchParams.passengers}
              onChange={(e) => setSearchParams({ passengers: Number(e.target.value) })}
              className="text-sm font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} Passenger{n !== 1 ? 's' : ''}, Economy
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Search button */}
        <Button
          onClick={onSearch}
          size="lg"
          className="lg:self-stretch lg:px-6"
          leftIcon={<Search className="w-4 h-4" />}
        >
          {compact ? 'Modify Search' : 'Search Flights'}
        </Button>
      </div>
    </div>
  );
}