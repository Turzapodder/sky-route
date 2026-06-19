import { Search, Bell, User } from 'lucide-react';
export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="ex. PNR/Name/Ticket No/Booking Ref..."
            className="w-full pl-10 pr-16 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            aria-label="Global search"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded" aria-hidden="true">
            <span>⌘</span><span>K</span>
          </div>
        </div>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-3 ml-4">
        <button
          className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Solim</span>
          <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center">
            <User className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
