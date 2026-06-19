import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  enabled = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold]);

  return { targetRef, isIntersecting };
}
