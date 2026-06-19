import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { searchAirports, type AirportInfo } from '@/lib/airports';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
interface AirportInputProps {
  label: string;
  value: string;
  onChange: (code: string) => void;
  id: string;
}
export function AirportInput({ label, value, onChange, id }: AirportInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const debouncedQuery = useDebounce(query, 200);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchAirports(debouncedQuery);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    setHighlightIndex(0);
  }, [debouncedQuery]);
  function handleSelect(airport: AirportInfo) {
    onChange(airport.code);
    setQuery('');
    setIsOpen(false);
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[highlightIndex]) {
          handleSelect(results[highlightIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  }
  const selectedAirport = searchAirports(value).find((a) => a.code === value);
  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="flex items-center gap-2 w-full text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <div className="min-w-0">
          <span className="text-sm font-semibold text-gray-900 block truncate">
            {selectedAirport ? `${selectedAirport.city} (${selectedAirport.code})` : value}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-[fadeIn_0.15s_ease-out]">
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              id={id}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search city or airport..."
              className="w-full px-3 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              role="combobox"
              aria-autocomplete="list"
              aria-controls={`${id}-listbox`}
              aria-activedescendant={results[highlightIndex] ? `${id}-option-${highlightIndex}` : undefined}
            />
          </div>
          <ul
            id={`${id}-listbox`}
            role="listbox"
            className="max-h-56 overflow-y-auto py-1"
          >
            {results.map((airport, index) => (
              <li
                key={airport.code}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={airport.code === value}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors',
                  index === highlightIndex
                    ? 'bg-brand/5 text-brand'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                onClick={() => handleSelect(airport)}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-gray-600">{airport.code}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{airport.city}</p>
                  <p className="text-xs text-gray-500 truncate">{airport.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}