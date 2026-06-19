import { useState } from 'react';
import { Search, CalendarDays, Wallet, Users, FileText, HeadphonesIcon, Settings, LogOut, EyeOff, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'search', label: 'Search Flight', icon: Search, active: true },
  { id: 'bookings', label: 'My bookings', icon: CalendarDays, active: false },
  { id: 'deposit', label: 'Add Deposit', icon: Wallet, active: false },
  { id: 'traveller', label: 'Manage Traveller', icon: Users, active: false },
  { id: 'report', label: 'Report / Dashboard', icon: FileText, active: false },
  { id: 'support', label: 'Support Ticket', icon: HeadphonesIcon, active: false },
];

export function Sidebar({ isCollapsed }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('search');

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 bg-white border-r border-gray-100 z-40 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Nav Items */}
      <nav className="py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-semibold',
                isActive
                  ? 'bg-white text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Balance Card */}
      {!isCollapsed && (
        <div className="px-4 mt-auto mb-6">
          <div className="bg-[#18181b] rounded-xl p-4 text-white relative overflow-hidden group cursor-pointer">
            {/* Background decoration */}
            <div className="absolute right-[-20%] top-[-20%] w-32 h-32 bg-orange-500/20 rounded-full blur-2xl transition-all group-hover:bg-orange-500/30" />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-orange-400" />
              </div>
              <button className="text-gray-400 hover:text-white transition-colors" aria-label="Hide balance">
                <EyeOff className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative z-10">
              <p className="text-xs text-gray-400 mb-1">Total Balance</p>
              <div className="flex items-end justify-between">
                <p className="text-xl font-bold tracking-wide">$3,560.00</p>
                <button className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Add funds">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <button className="text-xs font-semibold text-gray-900 underline mt-3 hover:text-gray-600 transition-colors px-1">
            See all Transactions
          </button>
        </div>
      )}

      {/* Bottom section */}
      <div className="px-4 pb-6 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm font-semibold">
          <Settings className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm font-semibold">
          <LogOut className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
