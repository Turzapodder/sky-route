import { Search, Bell, Plane, ChevronLeft } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#18181b] flex items-center justify-between px-5 z-50 shadow-md">
      {/* Logo & Toggle */}
      <div className="flex items-center gap-6 sm:gap-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <Plane className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-lg leading-tight tracking-wide">Sky Routes</h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-[-2px]">Flights</p>
          </div>
        </div>

        {/* Sidebar Toggle */}
        <button
          className="w-7 h-7 bg-[#27272a] rounded-md shadow-sm flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl px-6 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="ex. PNR/Name/Ticket No/Booking Ref..."
            className="w-full pl-10 pr-16 py-1.5 bg-[#27272a] border border-transparent rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all"
            aria-label="Global search"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-semibold text-gray-400 bg-[#3f3f46] px-1.5 py-0.5 rounded border border-gray-600" aria-hidden="true">
            <span>⌘</span><span>K</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#27272a] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand rounded-full border-2 border-[#18181b]" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-700 h-8">
          <span className="text-sm font-medium text-white hidden sm:block">Turjha Podder</span>
          <div className="w-8 h-8 rounded bg-brand text-white text-xs font-bold flex items-center justify-center shadow-sm">
            TZ
          </div>
        </div>
      </div>
    </header>
  );
}
