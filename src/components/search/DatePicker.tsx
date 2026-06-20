import { useState, useRef, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { useSearchStore } from '@/store/useSearchStore';
import { cn } from '@/lib/utils';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  label: string;
  compact?: boolean;
  disabled?: boolean;
}

export function DatePicker({ label, compact = false, disabled = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { searchParams, setSearchParams } = useSearchStore();

  const selectedDate = searchParams.departureDate ? parseISO(searchParams.departureDate) : undefined;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(date: Date | undefined) {
    if (date) {
      setSearchParams({ departureDate: format(date, 'yyyy-MM-dd') });
      setIsOpen(false);
    }
  }

  const formattedDate = selectedDate ? format(selectedDate, 'dd MMM yyyy') : 'Select date';

  return (
    <div ref={containerRef} className={cn("relative w-full", disabled && "opacity-60")}>
      {/* Trigger Button */}
      {compact ? (
        <div className="flex flex-col justify-center relative w-full h-full cursor-pointer" onClick={() => !disabled && setIsOpen(!isOpen)}>
          <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5 cursor-pointer">
            {label}
          </label>
          <div className="flex items-center gap-2">
            <CalendarDays className={cn("w-4 h-4 flex-shrink-0", disabled ? "text-gray-400" : "text-brand")} />
            <div className={cn("text-sm font-bold truncate uppercase", disabled ? "text-gray-400" : "text-gray-900")}>
              {formattedDate}
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn("flex items-center gap-3 w-full text-left", disabled && "cursor-not-allowed")}
          disabled={disabled}
        >
          <div className="flex-shrink-0 text-gray-400">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <label className={cn("block text-xs font-medium mb-0.5", disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer text-gray-500")}>
              {label}
            </label>
            <span className={cn("text-[15px] font-semibold block truncate uppercase", disabled ? "text-gray-400" : "text-gray-900")}>
              {formattedDate}
            </span>
          </div>
        </button>
      )}

      {/* Popover */}
      {isOpen && !disabled && (
        <div className={cn(
          "absolute left-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-[fadeIn_0.15s_ease-out]",
          compact ? "top-full -left-4" : "top-full"
        )}>
          <style>{`
            .rdp {
              --rdp-cell-size: 40px;
              --rdp-accent-color: #111827;
              --rdp-background-color: #f3f4f6;
              margin: 0;
            }
            .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
              color: white;
              background-color: #111827;
            }
            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
              background-color: #f3f4f6;
            }
          `}</style>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={{ before: new Date() }}
            showOutsideDays
          />
        </div>
      )}
    </div>
  );
}
