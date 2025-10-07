'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PageTransitionLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (previousPathname !== pathname) {
      setLoading(true);
      setPreviousPathname(pathname);
    }
  }, [pathname, previousPathname]);

  useEffect(() => {
    // Hide loader when the new page is fully rendered.
    // A small delay ensures the content has time to paint.
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 400); // Adjust delay as needed

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300',
        loading ? 'opacity-100' : 'opacity-0'
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
