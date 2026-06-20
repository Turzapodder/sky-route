import { ArrowLeft, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchForm } from '@/components/search/SearchForm';
import { FlightResults } from '@/components/results/FlightResults';
import { PromoBanner } from '@/components/promotions/PromoBanner';
import { BookingModal } from '@/components/booking/BookingModal';
import { useFlightSearch } from '@/hooks/useFlightSearch';
import { useBookingStore } from '@/store/useBookingStore';
import { useSearchStore } from '@/store/useSearchStore';
import type { Flight } from '@/types/flight';
export function ResultsPage() {
  const { flights, airlines, isLoading, error, hasSearched, handleSearch } = useFlightSearch();
  const { openBooking } = useBookingStore();
  const { searchParams, setHasSearched } = useSearchStore();
  function handleBook(flight: Flight) {
    openBooking(flight, searchParams.passengers);
  }
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto overflow-hidden">
        {hasSearched ? (
          <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-center gap-4">
              <button className="text-gray-900 hover:text-gray-600 transition-colors" aria-label="Go back" onClick={() => setHasSearched(false)}>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-medium text-gray-900">
                Flight Results
              </h1>
            </div>
            
            {/* Compact Search Form */}
            <SearchForm onSearch={handleSearch} compact />
            
            {/* Results */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FlightResults
                flights={flights}
                airlines={airlines}
                isLoading={isLoading}
                error={error}
                onBook={handleBook}
                onRetry={handleSearch}
              />
            </motion.div>
          </div>
        ) : (
          <div className="pt-4">
            {/* Expanded Search Form */}
            <SearchForm onSearch={handleSearch} compact={false} />
            
            {/* Promo Banner */}
            <PromoBanner />
          </div>
        )}
      </div>
      {/* Booking Modal */}
      <BookingModal />
    </>
  );
}