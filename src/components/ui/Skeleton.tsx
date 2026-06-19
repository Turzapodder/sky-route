import { cn } from '@/lib/utils';
interface SkeletonProps {
  className?: string;
}
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton-gradient rounded-lg', className)}
      role="status"
      aria-label="Loading"
    />
  );
}
export function FlightCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4" role="status" aria-label="Loading flight">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-20 h-3" />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-8">
          <div className="space-y-2 text-center">
            <Skeleton className="w-16 h-5" />
            <Skeleton className="w-10 h-3 mx-auto" />
          </div>
          <Skeleton className="w-32 h-4" />
          <div className="space-y-2 text-center">
            <Skeleton className="w-16 h-5" />
            <Skeleton className="w-10 h-3 mx-auto" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="w-24 h-5 ml-auto" />
          <Skeleton className="w-20 h-3 ml-auto" />
          <Skeleton className="w-24 h-3 ml-auto" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex gap-2">
          <Skeleton className="w-20 h-5 rounded-full" />
          <Skeleton className="w-24 h-5 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-24 h-8 rounded-lg" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}