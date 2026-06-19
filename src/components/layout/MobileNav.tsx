import { Search, BookOpen, Plane } from 'lucide-react';
export function MobileNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16">
        <button
          className="flex flex-col items-center gap-1 text-brand"
          aria-current="page"
          aria-label="Search flights"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 text-gray-400"
          aria-label="My bookings"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium">Bookings</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 text-gray-400"
          aria-label="Flights"
        >
          <Plane className="w-5 h-5" />
          <span className="text-[10px] font-medium">Flights</span>
        </button>
      </div>
    </nav>
  );
}
