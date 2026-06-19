import { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { useSearchStore } from '@/store/useSearchStore';
import { cn } from '@/lib/utils';
export function FilterPanel() {
  const { filters, setFilter, resetFilters } = useSearchStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const activeFilterCount =
    (filters.airlines.length > 0 ? 1 : 0) +
    (filters.maxStops !== null ? 1 : 0) +
    (filters.refundableOnly ? 1 : 0);
  const stopOptions = [
    { value: null, label: 'Any Stops' },
    { value: 0, label: 'Direct Only' },
    { value: 1, label: '1 Stop or Less' },
    { value: 2, label: '2 Stops or Less' },
  ];
  function toggleDropdown(name: string) {
    setOpenDropdown(openDropdown === name ? null : name);
  }
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Stops filter */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown('stops')}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200',
            filters.maxStops !== null
              ? 'bg-brand/5 text-brand border-brand/30'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          )}
          aria-expanded={openDropdown === 'stops'}
          aria-haspopup="listbox"
        >
          <Filter className="w-3.5 h-3.5" aria-hidden="true" />
          {filters.maxStops !== null
            ? filters.maxStops === 0
              ? 'Direct'
              : `≤${filters.maxStops} Stop${filters.maxStops > 1 ? 's' : ''}`
            : 'Direct / Connecting'}
          <ChevronDown className="w-3 h-3" aria-hidden="true" />
        </button>
        {openDropdown === 'stops' && (
          <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 animate-[fadeIn_0.15s_ease-out]">
            {stopOptions.map((option) => (
              <button
                key={String(option.value)}
                onClick={() => {
                  setFilter('maxStops', option.value);
                  setOpenDropdown(null);
                }}
                className={cn(
                  'w-full px-3 py-2 text-left text-xs font-medium transition-colors',
                  filters.maxStops === option.value
                    ? 'bg-brand/5 text-brand'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                role="option"
                aria-selected={filters.maxStops === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Refundable toggle */}
      <button
        onClick={() => setFilter('refundableOnly', !filters.refundableOnly)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200',
          filters.refundableOnly
            ? 'bg-brand/5 text-brand border-brand/30'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        )}
        aria-pressed={filters.refundableOnly}
      >
        Refundable
      </button>
      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          aria-label="Clear all filters"
        >
          <X className="w-3 h-3" />
          Clear ({activeFilterCount})
        </button>
      )}
    </div>
  );
}