import { ArrowRight, ArrowLeftRight, CalendarDays, Users, ChevronDown, Search, PlaneTakeoff, PlaneLanding } from 'lucide-react';
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
    <div className="space-y-4">
      <div className={cn('bg-white rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]', compact ? 'p-4 rounded-xl' : 'p-6 sm:p-8')}>
         <div className={cn("flex items-center justify-between mb-6", compact && "mb-4")}>
          <div className="flex items-center gap-6" role="radiogroup" aria-label="Trip type">
            {tripTypes.map((type) => (
              <button
                key={type.value}
                role="radio"
                aria-checked={searchParams.tripType === type.value}
                onClick={() => setSearchParams({ tripType: type.value })}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border-[5px] flex items-center justify-center transition-all',
                    searchParams.tripType === type.value
                      ? 'border-gray-900'
                      : 'border-gray-300 bg-white'
                  )}
                />
                {type.label}
              </button>
            ))}
          </div>
          
          {compact && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">$</span>
              <span>Currency</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>

        {compact ? (
          <div className="flex flex-col lg:flex-row items-stretch border border-gray-200 rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-gray-200 bg-white">
            <div className="flex items-center flex-1 min-w-0 relative group">
              <div className="flex-1 px-4 py-2.5 min-w-0 relative">
                <AirportInput label="Origin" value={searchParams.origin} onChange={(code) => setSearchParams({ origin: code })} id="origin-airport" />
              </div>
              <button
                onClick={() => setSearchParams({ origin: searchParams.destination, destination: searchParams.origin })}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all z-10 shadow-sm"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1 px-4 py-2.5 min-w-0 pl-6 border-l border-gray-200">
                <AirportInput label="Destination" value={searchParams.destination} onChange={(code) => setSearchParams({ destination: code })} id="destination-airport" />
              </div>
            </div>

            <div className="px-4 py-2.5 lg:w-44 flex flex-col justify-center">
              <label htmlFor="departure-date" className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Departing Date</label>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-brand flex-shrink-0" />
                <input id="departure-date" type="date" value={searchParams.departureDate} onChange={(e) => setSearchParams({ departureDate: e.target.value })} className="text-sm font-bold text-gray-900 bg-transparent border-none focus:outline-none w-full uppercase" />
              </div>
            </div>

            <div className="px-4 py-2.5 lg:w-44 flex flex-col justify-center">
              <label htmlFor="returning-date" className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Returning Date</label>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input id="returning-date" type="date" value={searchParams.departureDate} disabled className="text-sm font-bold text-gray-900 bg-transparent border-none focus:outline-none w-full text-gray-400 uppercase" />
              </div>
            </div>

            <div className="px-4 py-2.5 lg:w-56 flex flex-col justify-center relative">
              <label htmlFor="passenger-count" className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Passengers & Class</label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand flex-shrink-0" />
                <select id="passenger-count" value={searchParams.passengers} onChange={(e) => setSearchParams({ passengers: Number(e.target.value) })} className="text-sm font-bold text-gray-900 bg-transparent border-none focus:outline-none w-full cursor-pointer appearance-none">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Passenger{n !== 1 ? 's' : ''}, Economy</option>)}
                </select>
              </div>
            </div>

            <div className="p-2 flex items-center justify-center bg-white rounded-r-xl">
              <Button onClick={onSearch} size="lg" className="w-full lg:w-auto h-full px-6 rounded-lg whitespace-nowrap bg-gray-900 hover:bg-gray-800 text-white font-semibold">
                Modify Search
              </Button>
            </div>
          </div>
        ) : (
          /* EXPANDED BLOCK LAYOUT */
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 relative">
              <div className="flex-1 w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 min-w-0 transition-colors hover:bg-gray-100">
                <AirportInput 
                  label="From" 
                  value={searchParams.origin} 
                  onChange={(code) => setSearchParams({ origin: code })} 
                  id="origin-airport"
                  icon={<PlaneTakeoff className="w-5 h-5" />}
                />
              </div>
              
              <button
                onClick={() => setSearchParams({ origin: searchParams.destination, destination: searchParams.origin })}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center text-gray-700 hover:text-gray-900 transition-all z-10"
                aria-label="Swap origin and destination"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
              
              <div className="flex-1 w-full px-5 py-3.5 bg-white rounded-2xl border-2 border-gray-900 min-w-0 shadow-sm">
                <AirportInput 
                  label="To" 
                  value={searchParams.destination} 
                  onChange={(code) => setSearchParams({ destination: code })} 
                  id="destination-airport"
                  icon={<PlaneLanding className="w-5 h-5 text-gray-900" />}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100">
                <label htmlFor="departure-date" className="block text-xs font-medium text-gray-500 mb-1">Departing</label>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-gray-400" />
                  <input id="departure-date" type="date" value={searchParams.departureDate} onChange={(e) => setSearchParams({ departureDate: e.target.value })} className="text-[15px] font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full uppercase" />
                </div>
              </div>
              
              <div className="px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100">
                <label htmlFor="returning-date" className="block text-xs font-medium text-gray-500 mb-1">Returning</label>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-gray-400" />
                  <input id="returning-date" type="date" value={searchParams.departureDate} disabled className="text-[15px] font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full text-gray-400 uppercase" />
                </div>
              </div>
              
              <div className="px-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100 relative">
                <label htmlFor="passenger-count" className="block text-xs font-medium text-gray-500 mb-1">Passenger and class</label>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <select id="passenger-count" value={searchParams.passengers} onChange={(e) => setSearchParams({ passengers: Number(e.target.value) })} className="text-[15px] font-semibold text-gray-900 bg-transparent border-none focus:outline-none w-full appearance-none cursor-pointer">
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Passenger{n !== 1 ? 's' : ''}, Economy Class</option>)}
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-600 absolute right-4 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button className="text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors">+ Add a promo code</button>
            </div>
          </div>
        )}
      </div>

      {/* Button below card for expanded mode */}
      {!compact && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={onSearch}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-[#18181b] hover:bg-black text-white font-semibold text-lg shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-0.5"
          >
            <Search className="w-5 h-5" />
            Check out flights
          </Button>
        </div>
      )}
    </div>
  );
}