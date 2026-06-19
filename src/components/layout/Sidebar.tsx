import { useState } from 'react';
import { Plane, Search, BookOpen, ChevronLeft, ChevronRight, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}
const navItems = [
  { id: 'search', label: 'Search Flight', icon: Search, active: true },
  { id: 'bookings', label: 'My Bookings', icon: BookOpen, active: false },
];
export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('search');
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-sidebar text-sidebar-text z-40 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
          <Plane className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-white font-bold text-lg leading-tight">SkyRoute</h1>
            <p className="text-[10px] text-sidebar-text tracking-wider uppercase">Flights</p>
          </div>
        )}
      </div>
      {/* Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors z-50"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
      {/* Nav Items */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium',
                isActive
                  ? 'bg-sidebar-active text-sidebar-text-active shadow-sm'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1 border-t border-white/10 pt-4">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-all duration-200 text-sm font-medium">
          <Settings className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-all duration-200 text-sm font-medium">
          <LogOut className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
