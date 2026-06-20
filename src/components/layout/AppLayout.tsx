import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
interface AppLayoutProps {
  children: React.ReactNode;
}
export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-surface-secondary pt-16 overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Main content */}
        <main
          id="main-content"
          className={cn(
            'flex-1 transition-all duration-300 pb-20 lg:pb-6 overflow-x-hidden',
            sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}