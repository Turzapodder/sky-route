import { ArrowLeft, ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <div className="mt-12 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">Offer & Promotions</h2>
      
      <div className="relative w-full h-[240px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden group">
        <img 
          src="/flight-banners.png" 
          alt="Fly to Istanbul Promotion" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md">
            <h3 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-lg">
              FLY TO<br/>ISTANBUL
            </h3>
            <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-4 py-2">
              <p className="text-xs text-white/80 uppercase font-semibold tracking-wider mb-0.5">Promo Code</p>
              <p className="text-xl font-bold text-white tracking-widest">GENZ2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-gray-900 rounded-full" />
          <div className="w-8 h-0.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors" />
          <div className="w-8 h-0.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors" />
          <div className="w-8 h-0.5 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors" />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="text-gray-900 hover:text-gray-500 transition-colors" aria-label="Previous promo">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="text-gray-900 hover:text-gray-500 transition-colors" aria-label="Next promo">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
