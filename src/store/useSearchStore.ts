import { create } from 'zustand';
import { type SearchParams, type FilterState, type ViewMode, SortOption, TripType, CabinClass, DEFAULT_FILTERS } from '@/types/search';
interface SearchState {
  searchParams: SearchParams;
  filters: FilterState;
  sortOption: SortOption;
  viewMode: ViewMode;
  hasSearched: boolean;
  setSearchParams: (params: Partial<SearchParams>) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSortOption: (sort: SortOption) => void;
  setViewMode: (mode: ViewMode) => void;
  resetFilters: () => void;
  setHasSearched: (val: boolean) => void;
  toggleAirlineFilter: (code: string) => void;
}
export const useSearchStore = create<SearchState>((set, get) => ({
  searchParams: {
    origin: 'DAC',
    destination: 'IST',
    departureDate: '2026-12-20',
    passengers: 2,
    passengerDetails: { adults: 2, children: 0, infants: 0 },
    cabinClass: CabinClass.ECONOMY,
    tripType: TripType.ONE_WAY,
  },
  filters: { ...DEFAULT_FILTERS },
  sortOption: SortOption.CHEAPEST,
  viewMode: 'list',
  hasSearched: false,
  setSearchParams: (params) =>
    set((state) => ({
      searchParams: { ...state.searchParams, ...params },
    })),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  setSortOption: (sort) => set({ sortOption: sort }),
  setViewMode: (mode) => set({ viewMode: mode }),
  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
  setHasSearched: (val) => set({ hasSearched: val }),
  toggleAirlineFilter: (code) => {
    const current = get().filters.airlines;
    const updated = current.includes(code)
      ? current.filter((c) => c !== code)
      : [...current, code];
    set((state) => ({
      filters: { ...state.filters, airlines: updated },
    }));
  },
}));