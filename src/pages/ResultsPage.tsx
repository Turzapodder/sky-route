import { ArrowLeft, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchForm } from '@/components/search/SearchForm';
import { FlightResults } from '@/components/results/FlightResults';
import { BookingModal } from '@/components/booking/BookingModal';
import { useFlightSearch } from '@/hooks/useFlightSearch';
import { useBookingStore } from '@/store/useBookingStore';
import { useSearchStore } from '@/store/useSearchStore';
import type { Flight } from '@/types/flight';
export function ResultsPage() {
  const { flights, airlines, isLoading, error, hasSearched, handleSearch } = useFlightSearch();
  const { openBooking } = useBookingStore();
  const { searchParams } = useSearchStore();
  function handleBook(flight: Flight) {
    openBooking(flight, searchParams.passengers);
  }
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1400px] mx-auto">
        {/* Page header */}
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors" aria-label="Go back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Plane className="w-5 h-5 text-brand" aria-hidden="true" />
            Flight <span className="font-normal text-gray-500">Results</span>
          </h1>
        </div>
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} compact />
        {/* Results */}
        {hasSearched ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mb-6">
              <Plane className="w-10 h-10 text-brand" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Search for Flights
            </h2>
            <p className="text-sm text-gray-500 max-w-md mb-6">
              Enter your travel details above and click search to find the best flight deals across top airlines.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium text-sm shadow-lg hover:bg-gray-800 transition-colors"
            >
              Search Flights
            </motion.button>
          </div>
        )}
      </div>
      {/* Booking Modal */}
      <BookingModal />
    </>
  );
}