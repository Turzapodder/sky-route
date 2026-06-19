import { useSearchStore } from '@/store/useSearchStore';
import { SortOption } from '@/types/search';
import { cn } from '@/lib/utils';
const sortOptions = [
  { value: SortOption.CHEAPEST, label: 'Cheapest' },
  { value: SortOption.FASTEST, label: 'Fastest' },
  { value: SortOption.DEPARTURE, label: 'Departure' },
  { value: SortOption.DURATION, label: 'Duration' },
];
export function SortControls() {
  const { sortOption, setSortOption } = useSearchStore();
  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Sort flights by">
      {sortOptions.map((option) => {
        const isActive = sortOption === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => setSortOption(option.value)}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
              isActive
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}