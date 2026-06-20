import { useState, useRef, useEffect } from 'react';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { CabinClass, type PassengerDetails } from '@/types/search';
import { cn } from '@/lib/utils';

interface PassengerSelectorProps {
  compact?: boolean;
}

export function PassengerSelector({ compact = false }: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { searchParams, setSearchParams } = useSearchStore();
  const details = searchParams.passengerDetails;
  const cabinClass = searchParams.cabinClass;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function updateCount(type: keyof PassengerDetails, delta: number) {
    const newVal = Math.max(type === 'adults' ? 1 : 0, details[type] + delta);
    const newDetails = { ...details, [type]: newVal };
    const totalPassengers = newDetails.adults + newDetails.children + newDetails.infants;
    
    setSearchParams({ 
      passengerDetails: newDetails,
      passengers: totalPassengers
    });
  }

  const cabinOptions = Object.values(CabinClass);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      {compact ? (
        <div className="flex flex-col justify-center relative w-full h-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5 cursor-pointer">
            Passengers & Class
          </label>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand flex-shrink-0" />
            <div className="text-sm font-bold text-gray-900 truncate">
              {searchParams.passengers} Passenger{searchParams.passengers !== 1 ? 's' : ''}, {cabinClass}
            </div>
            <ChevronDown className={cn("w-4 h-4 text-gray-400 absolute right-0 transition-transform", isOpen && "rotate-180")} />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 w-full text-left"
        >
          <div className="flex-shrink-0 text-gray-400">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-0.5 cursor-pointer">
              Passenger and class
            </label>
            <span className="text-[15px] font-semibold text-gray-900 block truncate">
              {searchParams.passengers} Passenger{searchParams.passengers !== 1 ? 's' : ''}, {cabinClass}
            </span>
          </div>
          <ChevronDown className={cn("w-5 h-5 text-gray-600 flex-shrink-0 transition-transform", isOpen && "rotate-180")} />
        </button>
      )}

      {/* Popover */}
      {isOpen && (
        <div className={cn(
          "absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 animate-[fadeIn_0.15s_ease-out]",
          compact ? "top-full -left-16" : "top-full"
        )}>
          
          {/* Counters */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">Adults</p>
                <p className="text-xs text-gray-500">12+ years</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateCount('adults', -1)} disabled={details.adults <= 1} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center text-sm font-bold">{details.adults}</span>
                <button onClick={() => updateCount('adults', 1)} disabled={details.adults >= 9} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">Children</p>
                <p className="text-xs text-gray-500">2-11 years</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateCount('children', -1)} disabled={details.children <= 0} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center text-sm font-bold">{details.children}</span>
                <button onClick={() => updateCount('children', 1)} disabled={details.children >= 9} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">Infants</p>
                <p className="text-xs text-gray-500">Under 2 years</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => updateCount('infants', -1)} disabled={details.infants <= 0} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center text-sm font-bold">{details.infants}</span>
                <button onClick={() => updateCount('infants', 1)} disabled={details.infants >= details.adults} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 -mx-5 mb-5" />

          {/* Cabin Class */}
          <div>
            <p className="text-sm font-bold text-gray-900 mb-3">Cabin Class</p>
            <div className="grid grid-cols-2 gap-2">
              {cabinOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSearchParams({ cabinClass: opt as CabinClass })}
                  className={cn(
                    "px-3 py-2 text-xs font-semibold rounded-lg transition-colors border",
                    cabinClass === opt 
                      ? "bg-gray-900 text-white border-gray-900" 
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
