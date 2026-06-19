import { ChevronDown, AlignJustify, List } from 'lucide-react';

export function FilterPanel() {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {/* Static Mockup Dropdowns */}
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 bg-white transition-colors">
        Direct / Connecting
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>
      
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 bg-white transition-colors">
        Airline
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 bg-white transition-colors">
        +3
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      <div className="w-px h-6 bg-gray-200 mx-0.5" />

      {/* View Mode Toggles */}
      <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 hidden sm:flex">
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-900 border border-gray-200/50 shadow-sm">
          <AlignJustify className="w-3.5 h-3.5" />
          List View
        </button>
        <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
          <List className="w-3.5 h-3.5" />
          Table View
        </button>
      </div>
    </div>
  );
}